import os
from functools import lru_cache
from pathlib import Path

from pydantic import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    debug: bool = True

    # database
    db_name: str = "barifac"
    db_host: str = "postgres"
    db_port: int = 5432
    db_user: str = "postgres"
    db_password: str = "password"
    db_url: str = f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{str(db_port)}/{db_name}"

    class Config:
        env_file = os.path.join(BASE_DIR, "fastapi.env")


@lru_cache
def get_env():
    return Settings()
