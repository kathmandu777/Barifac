from pydantic import BaseModel


class BaseTermSchema(BaseModel):
    academic_year: int
    semester: str

    class Config:
        orm_mode = True
