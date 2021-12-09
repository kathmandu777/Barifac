import argparse
import logging
import logging.config
from datetime import datetime

from app.core.exceptions import ApiException
from app.core.handlers import api_exception_handler
from app.core.log import LogConfig
from app.middlwares import (
    BackendAuth,
    CORSMiddleware,
    DBSessionMiddleware,
    HttpRequestMiddleware,
)
from app.routers.monitoring import monitoring_router
from app.routers.v1 import api_v1_router
from pytz import timezone
from starlette.middleware.authentication import AuthenticationMiddleware

from fastapi import APIRouter, FastAPI


def tokyoTime(*args):
    return datetime.now(timezone("Asia/Tokyo")).timetuple()


logging.Formatter.converter = tokyoTime
logging.config.dictConfig(LogConfig().dict())

app = FastAPI()

# exception handler
"""
TODO
As far as I know, everyone doesn't work this properly.
So, at this stage, I left this code as comment out.
"""
# app.add_exception_handler(Exception, system_exception_handler)
app.add_exception_handler(ApiException, api_exception_handler)

# middlewares (後に追加したものが先に実行される)
app.add_middleware(AuthenticationMiddleware, backend=BackendAuth())
app.add_middleware(DBSessionMiddleware)
app.add_middleware(HttpRequestMiddleware)
app.add_middleware(CORSMiddleware)

router = APIRouter()
router.include_router(monitoring_router, tags=["monitoring"])
router.include_router(api_v1_router, prefix="/api/v1", tags=["api/v1"])
app.include_router(router)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Barifac API Server")
    parser.add_argument("command", help="command", choices=["seed"])

    args = parser.parse_args()
    if args.command == "seed":
        from app.db.seed import seed_all

        seed_all()
