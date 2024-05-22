from fastapi import APIRouter,FastAPI, File, UploadFile
import pandas as pd
import json
import numpy as np
import os
from fastapi.responses import FileResponse

index_compare_router = APIRouter()


@index_compare_router.get("/index_compare")
async def data():
    df = pd.read_excel("data/index_compare.xlsx")
    df.replace(np.nan, None, inplace=True)
    advanced = []
    mean = []
    unqualified = []
    total_scores = 0
    total_system_scores = 0

    # 每个指标的得分百分比
    score_percent = {
        "labels": [],
        "values": []
    }

    for index, row in df.iterrows():
        flag = -1
        if row["油区系统一级指标实际值"] is None:
            continue
        if row["先进值"] > row["平均值"]:
            if row["油区系统一级指标实际值"] >= row["先进值"]:
                advanced.append(row.to_dict())
                score_percent["labels"].append(row["指标名称"])
                score_percent["values"].append(100)
                flag = 1
            elif row["油区系统一级指标实际值"] >= row["平均值"]:
                mean.append(row.to_dict())
                score_percent["labels"].append(row["指标名称"])
                score_percent["values"].append(round(row["油区系统一级指标实际值"] / row["先进值"] * 100, 0))
                flag = 2
            else:
                unqualified.append(row.to_dict())
                score_percent["labels"].append(row["指标名称"])
                score_percent["values"].append(round(row["油区系统一级指标实际值"] / row["先进值"] * 100, 0))
                flag = 3

        else:
            if row["油区系统一级指标实际值"] <= row["先进值"]:
                advanced.append(row.to_dict())
                score_percent["labels"].append(row["指标名称"])
                score_percent["values"].append(100)
                flag = 1
            elif row["油区系统一级指标实际值"] <= row["平均值"]:
                mean.append(row.to_dict())
                score_percent["labels"].append(row["指标名称"])
                score_percent["values"].append(
                    max(0, round((row["平均值"] - row["油区系统一级指标实际值"]) / (row["平均值"] - row["先进值"]) / 2 * 100, 0)))
                flag = 2
            else:
                unqualified.append(row.to_dict())
                score_percent["labels"].append(row["指标名称"])
                score_percent["values"].append(
                    max(0, round((row["平均值"] - row["油区系统一级指标实际值"]) / (row["平均值"] - row["先进值"]) / 2 * 100, 0)))
                flag = 3

        if row["重要性赋值"] is not None:
            total_scores = total_scores + row["重要性赋值"]
            if flag == 1:
                total_system_scores = total_system_scores + row["达到中石化先进值的赋值"]
            elif flag == 2:
                total_system_scores = total_system_scores + row["达到中石化平均值的赋值"]
            elif flag == 3:
                total_system_scores = total_system_scores + row["未达到中石化平均值的赋值"]

    score = total_system_scores / total_scores * 100

    # 占比
    rates = []
    all_len = len(advanced) + len(mean) + len(unqualified)
    rates.append(round(len(advanced) / all_len, 2))
    rates.append(round(len(mean) / all_len, 2))
    rates.append(round(len(unqualified) / all_len, 2))

    # 打分

    resp = {}
    resp["score_percent"] = score_percent
    resp["rates"] = rates
    resp["advanced"] = advanced
    resp["mean"] = mean
    resp["unqualified"] = unqualified
    resp["score"] = score
    print(resp)
    return resp


@index_compare_router.get("/index_optimize_well")
async def optimize_well():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="串-油井串接")
    data1 = []
    count1 = 0
    count2 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "-"
        if row["是否采用功图在线计量装置"] == "是" and row["该油井附近是否有其他油井（≤0.3km）"] == "是" and row[
            "油井是否在区域中心站、分水站、分水点、增压点周边（≤1km）"] == "是" and row["串接后预计回压，MPa"] <= 1.5:
            row["优化建议"] = "油井串接"
            count1 += 1
        if row["油井到原油集输支线距离，km"] < row["油井到隶属站距离，km"] and row["是否采用功图在线计量装置"] == "是":
            row["优化建议"] = "串联后直接进站（点）或集输支干线"
            count2 += 1
        data1.append(row)
    return {"data": data1, "count1": count1, "count2": count2}


@index_compare_router.get("/index_optimize_metering_station")
async def optimize_metering_station():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="撤-计量站撤销")
    data1 = []
    count1 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["管辖油井是否使用功图计量装置"] == "是" and row["计量站仅具有计量功能"] == "是" and row["改造后进站或集输支干线前温度（℃）"] >= row[
            "原油凝固点（℃）"] + 3:
            row["优化建议"] = "撤销计量站"
            count1 += 1
        data1.append(row)
    return {"data": data1, "count1": count1}


@index_compare_router.get("/index_optimize_water_injection_station")
async def optimize_water_injection_station():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="并-注水站合并")
    data1 = []
    count1 = 0
    count_all_1 = 0
    count2 = 0
    count_all_2 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["类别"] == "注水站":
            count_all_1 += 1
            if row["两站站间距，km"] <= 5 and row["实际注水量"] * 2 <= row["设计能力"] and row["两站压力等级基本相同（MPa）"] == "是":
                row["优化建议"] = "撤并注水站"
                count1 += 1
        else:
            count_all_2 += 1
            if row["两站站间距，km"] <= 2 and row["实际注水量"] * 2 <= row["设计能力"] and row["两站压力等级基本相同（MPa）"] == "是":
                row["优化建议"] = "撤并单体泵站"
                count2 += 1
        data1.append(row)
    return {"data": data1, "count1": count1, "count2": count2, "count_all_1": count_all_1, "count_all_2": count_all_2}


@index_compare_router.get("/index_optimize_line")
async def optimize_water_injection_station():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="并-集油支干线合并")
    data1 = []
    count1 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["集油管线是否存在腐蚀穿孔等安全风险隐患"] == "是" and row["周边是否有同流向集油管线"] == "是" and row["实际流量（方/天）"] * 2 <= row[
            "设计流量（方/天）"] and row["富余能力（方/天）"] >= row["被撤管线流量（方/天）"]:
            row["优化建议"] = "集输支干线合并"
            count1 += 1
        data1.append(row)
    return {"data": data1, "count1": count1}


@index_compare_router.get("/index_optimize_line")
async def optimize_water_injection_station():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="并-集油支干线合并")
    data1 = []
    count1 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["集油管线是否存在腐蚀穿孔等安全风险隐患"] == "是" and row["周边是否有同流向集油管线"] == "是" and row["实际流量（方/天）"] * 2 <= row[
            "设计流量（方/天）"] and row["富余能力（方/天）"] >= row["被撤管线流量（方/天）"]:
            row["优化建议"] = "集输支干线合并"
            count1 += 1
        data1.append(row)
    return {"data": data1, "count1": count1}


@index_compare_router.get("/index_optimize_out_line")
async def optimize_out_line():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="并-输油管线合并")
    data1 = []
    count1 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["外输管线是否存在腐蚀穿孔等安全风险隐患"] == "是" and row["周边是否有同流向外输油管线"] == "是" and row["同流向外输油管线原油物性是否差别不大"] == "是" and \
                row["同流向外输油管线富余能力是否满足被撤并管线油量"] == "是" and row["实际流量（方/天）"] * 2 <= row["设计流量（方/天）"]:
            row["优化建议"] = "外输管线线合并"
            count1 += 1
        data1.append(row)
    return {"data": data1, "count1": count1}


@index_compare_router.get("/index_optimize_divide_water")
async def optimize_out_line():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="分-就地分水")
    data1 = []
    count1 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["采出液含水率，%"] > 70 and row["采出水往返距离，km"] > 10 and row["是否有注水需求"] == "是" and \
                row["存在问题"] != "无":
            row["优化建议"] = "新建分水点"
            count1 += 1
        data1.append(row)
    return {"data": data1, "count1": count1}


@index_compare_router.get("/index_optimize_transfer_station")
async def optimize_out_line():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="简-接转站降级或取消")
    data1 = []
    count1 = 0
    count2 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["取消后油井回压，MPa"] < 1.5 and row["接转站取消后插入点的压力，MPa"] < 1.5 and row["管线设计压力，MPa"] >= row["管线设计压力，MPa"] and \
                row["周边有无注水或掺水需求"] == "无":
            row["优化建议"] = "取消转接站"
            count1 += 1
        else:
            if row["周边有无注水或掺水需求"] == "无":
                row["优化建议"] = "接转站降级为增压点"
                count2 += 1
        data1.append(row)
    return {"data": data1, "count1": count1, "count2": count2}


@index_compare_router.get("/index_optimize_union_station")
async def optimize_out_line():
    df = pd.read_excel("data/index_optimize.xlsx", sheet_name="简-联合站降级")
    data1 = []
    count1 = 0
    for _, row in df.iterrows():
        row["优化建议"] = "无"
        if row["两座联合站场间距，km"] <= 10 and row["两联合站采出液物性是否相近，处理流程是否相同"] == "是" and row["两座联合站原油脱水负荷率均＜60%"] == "是"and \
                row["区域中心站能力是否满足降级站来液处理规模"] == "是":
            row["优化建议"] = "其中1座联合站降级为分水站"
            count1 += 1
        data1.append(row)
    return {"data": data1, "count1": count1}

@index_compare_router.get("/download/")
async def download_file():
    file_path ="data/data.rar"
    if os.path.exists(file_path):
        return FileResponse(file_path, filename="data.rar")
    return {"error": "File not found"}


@index_compare_router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join("data/", file.filename)
    with open(file_location, "wb") as f:
        f.write(file.file.read())
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}