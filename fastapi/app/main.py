from fastapi import APIRouter, FastAPI

from .middlwares import DBSessionMiddleware, HttpRequestMiddleware, CORSMiddleware
from .routers.v1 import api_v1_router

app = FastAPI()

# middlewares (後に追加したものが先に実行される)
app.add_middleware(DBSessionMiddleware)
app.add_middleware(HttpRequestMiddleware)
app.add_middleware(CORSMiddleware)

router = APIRouter()
router.include_router(api_v1_router, prefix="/api/v1", tags=["api/v1"])
app.include_router(router)
