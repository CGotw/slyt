#!/usr/bin/env python
# -*- coding:utf-8 -*-
import pandas as pd
import uvicorn

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/data1")
async def data1():
    df = pd.read_excel('data.xlsx', sheet_name='data1')
    data1 = []
    for _, row in df.iterrows():
        data1.append(row)

    return data1


@app.get("/data2")
async def data2():
    df = pd.read_excel('data.xlsx', sheet_name='data2')
    data2 = []
    for _, row in df.iterrows():
        data2.append(row)

    return data2


@app.get("/data3")
async def data3():
    df = pd.read_excel('data.xlsx', sheet_name='data3')
    data3 = []
    for _, row in df.iterrows():
        data3.append(row)

    return data3


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8081)
