from fastapi import APIRouter
import pandas as pd

index_router = APIRouter()


@index_router.get("/data1")
async def data1():
    df = pd.read_excel('data.xlsx', sheet_name='data1')
    data1 = []
    for _, row in df.iterrows():
        data1.append(row)

    return data1


@index_router.get("/data2")
async def data2():
    df = pd.read_excel('data.xlsx', sheet_name='data2')
    data2 = []
    for _, row in df.iterrows():
        data2.append(row)

    return data2


@index_router.get("/data3")
async def data3():
    df = pd.read_excel('data.xlsx', sheet_name='data3')
    data3 = []
    for _, row in df.iterrows():
        data3.append(row)

    return data3


@index_router.get("/index/overview_of_translation_regions")
async def overview_of_translation_regions():
    df = pd.read_excel('data.xlsx', sheet_name='研究油区总体介绍', header=0)
    data = []
    for _, row in df.iterrows():
        data.append(row)
    return data

@index_router.get("/all_data")
async def all_data():
    df = pd.read_excel('data.xlsx', sheet_name='echart1')

    # 将DataFrame转换为JSON可序列化的格式（例如，字典的列表）
    data = df.to_dict(orient='records')

    natural_gas_list = [item["natural_gas"] for item in data]
    carbon_emulsion_list = [item["carbon_emulsion"] for item in data]
    power_consumption_list = [item["power_consumption"] for item in data]
    total_list = [item["total"] for item in data]
    natural_gas_growth_rate_list = [item["natural_gas_growth_rate"] for item in data]
    growth_rate_of_carbon_emulsion_list = [item["growth_rate_of_carbon_emulsion"] for item in data]
    growth_rate_of_electricity_consumption_list = [item["growth_rate_of_electricity_consumption"] for item in data]
    total_growth_rate_list = [item["total_growth_rate"] for item in data]

    # data = [natural_gas_list,carbon_emulsion_list,power_consumption_list,total_list,natural_gas_growth_rate_list,growth_rate_of_carbon_emulsion_list,growth_rate_of_electricity_consumption_list,total_growth_rate_list]
    # 返回表中的所有数据
    # print(months_list)
    data = {
        "natural_gas":natural_gas_list,
        "carbon_emulsion": carbon_emulsion_list,
        "power_consumption": power_consumption_list,
        "total": total_list,
        "natural_gas_growth_rate": natural_gas_growth_rate_list,
        "growth_rate_of_carbon_emulsion": growth_rate_of_carbon_emulsion_list,
        "growth_rate_of_electricity_consumption": growth_rate_of_electricity_consumption_list,
        "total_growth_rate": total_growth_rate_list
            }
    return data


@index_router.get("/read_excel/{row_number}")
async def read_excel_row(row_number: int):
    # 指定Excel文件路径
    df = pd.read_excel('data.xlsx', sheet_name='echart1')

    data = df.iloc[row_number].to_dict()


    # data_dict = {
    #     data[1],data[2],data[3],data[4]
    # }

    return data


@index_router.get("/top-10")
async def read_top_10():
    df = pd.read_excel('data.xlsx', sheet_name='echart2')

        # 确保所请求的列存在于数据框中
    if "avg_efficiency" not in df.columns:
        return {"error": "指定的列不存在于Excel文件中"}

        # 选取前10个最大的值
    # top_10_largest = df["avg_efficiency"].nlargest(10)
    top_10_largest = df.sort_values(by="avg_efficiency", ascending=False).head(10)
    # top_10_largest = df["avg_efficiency"].nlargest(10).tolist()
    # 将结果转换为字典格式
    data = top_10_largest.to_dict(orient='records')
    date_list = [data[8]["date"],data[7]["date"],data[6]["date"],data[5]["date"],data[4]["date"],data[3]["date"],data[2]["date"],data[1]["date"],data[0]["date"]]
    avg_list = [data[8]["avg_efficiency"],data[7]["avg_efficiency"],data[6]["avg_efficiency"],data[5]["avg_efficiency"],data[4]["avg_efficiency"],data[3]["avg_efficiency"],data[2]["avg_efficiency"],data[1]["avg_efficiency"],data[0]["avg_efficiency"]]
    data_new = {"date":date_list,"avg_efficiency":avg_list}
    return data_new


@index_router.get("/energy_overview")
async def energy_overview():
    df = pd.read_excel('data.xlsx', sheet_name='能耗总览')
    df.columns=["name","energy_overview","system","union","water"]
    data = df.iloc[0].to_dict()
    print(data)
        # 确保所请求的列存在于数据框中

    return data


@index_router.get("/efficient")
async def efficient():
    df = pd.read_excel('data.xlsx', sheet_name='效率')
    columns=df.columns[1:]
    new_data = {i: col.rstrip("效率（%）") for i, col in enumerate(df.columns[1:])}

    return {'data':new_data}
        # 确保所请求的列存在于数据框中


@index_router.get("/efficient/{number}")
async def efficient_equip(number:int):
    df = pd.read_excel('data.xlsx', sheet_name='效率')
    # 使用 enumerate 函数遍历 DataFrame 的列
    # return df.columns
    new_columns = {old_col: str(i - 1) for i, old_col in enumerate(df.columns)}
    #
    # # 使用 rename 方法重命名列
    df.rename(columns=new_columns, inplace=True)

    sorted_df = df.sort_values(by=str(number),ascending=True)

    # 将排序后的列转换为列表
    print(df["-1"])
    sorted_column_list = sorted_df[str(number)].tolist()[:10]
    return {
        "date":df["-1"].tolist()[:10],
        "efficient":sorted_column_list
    }

        # 确保所请求的列存在于数据框中