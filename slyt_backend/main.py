import uvicorn
from fastapi import FastAPI
from apis.index import index_router
import pandas as pd
from starlette.middleware.cors import CORSMiddleware
app = FastAPI()
app.include_router(index_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8081)