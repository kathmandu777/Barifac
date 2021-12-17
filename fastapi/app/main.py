import argparse
import logging
import logging.config
from datetime import datetime

from app.core.exceptions import ApiException
from app.core.handlers import api_exception_handler
from app.core.log import LogConfig
from app.core.settings import get_env
from app.middlwares import (
    BackendAuth,
    CORSMiddleware,
    DBSessionMiddleware,
    HttpRequestMiddleware,
    TimeoutMiddleware,
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
app.add_middleware(TimeoutMiddleware, timeout=get_env().timeout_sec)
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
    parser.add_argument("command", help="command", choices=["seed", "scraping"])
    parser.add_argument(
        "-os",
        "--only_add_schools",
        action="store_true",
        help="only add schools",
        default=False,
    )
    parser.add_argument(
        "-osd",
        "--only-add-schools-and-departments",
        action="store_true",
        help="only add schools and departments",
        default=False,
    )
    parser.add_argument("-sn", "--school-name", help="school name")
    parser.add_argument("-dn", "--department-name", help="department name")

    args = parser.parse_args()
    if args.command == "seed":
        from app.db.seed import seed_all

        seed_all()

    elif args.command == "scraping":
        from app.core.scraping_syllabus import (
            add_all_data,
            add_schools,
            add_schools_and_departments,
            add_subjects_with_school_and_department,
        )

        if args.school_name and args.department_name:
            add_subjects_with_school_and_department(
                args.school_name, args.department_name
            )
        elif args.only_add_schools_and_departments:
            add_schools_and_departments()
        elif args.only_add_schools:
            add_schools()
        else:
            add_all_data()
