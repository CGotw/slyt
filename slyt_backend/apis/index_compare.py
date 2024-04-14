from fastapi import APIRouter
import pandas as pd
import json
import numpy as np
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

    for index, row in df.iterrows():
        flag = -1
        if row["油区系统一级指标实际值"] is None :
            continue
        if row["先进值"] > row["平均值"]:
            if row["油区系统一级指标实际值"] >= row["先进值"]:
                advanced.append(row.to_dict())
                flag = 1
            elif row["油区系统一级指标实际值"] >= row["平均值"]:
                mean.append(row.to_dict())
                flag = 2
            else:
                unqualified.append(row.to_dict())
                flag = 3
        else:
            if row["油区系统一级指标实际值"] <= row["先进值"]:
                advanced.append(row.to_dict())
                flag = 1
            elif row["油区系统一级指标实际值"] <= row["平均值"]:
                mean.append(row.to_dict())
                flag = 2
            else:
                unqualified.append(row.to_dict())
                flag = 3

        if row["重要性赋值"] is not None:
            total_scores = total_scores + row["重要性赋值"]
            if flag==1:
                total_system_scores=total_system_scores+row["达到中石化先进值的赋值"]
            elif flag==2:
                total_system_scores=total_system_scores+row["达到中石化平均值的赋值"]
            elif flag==3:
                total_system_scores=total_system_scores+row["未达到中石化平均值的赋值"]

    score=total_system_scores/total_scores*100
    resp={}
    resp["advanced"]=advanced
    resp["mean"]=mean
    resp["unqualified"]=unqualified
    resp["score"]=score
    print(resp)
    return resp

