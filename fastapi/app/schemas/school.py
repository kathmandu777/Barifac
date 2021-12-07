from pydantic import BaseModel


class BaseSchoolSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True
