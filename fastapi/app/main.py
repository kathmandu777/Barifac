import logging
import logging.config
from datetime import datetime

from pytz import timezone

from fastapi import APIRouter, FastAPI

from .core.log import LogConfig
from .middlwares import CORSMiddleware, DBSessionMiddleware, HttpRequestMiddleware
from .routers.monitoring import monitoring_router
from .routers.v1 import api_v1_router


def tokyoTime(*args):
    return datetime.now(timezone("Asia/Tokyo")).timetuple()


logging.Formatter.converter = tokyoTime
logging.config.dictConfig(LogConfig().dict())

app = FastAPI()

# middlewares (後に追加したものが先に実行される)
app.add_middleware(DBSessionMiddleware)
app.add_middleware(HttpRequestMiddleware)
app.add_middleware(CORSMiddleware)

router = APIRouter()
router.include_router(monitoring_router, tags=["monitoring"])
router.include_router(api_v1_router, prefix="/api/v1", tags=["api/v1"])
app.include_router(router)
