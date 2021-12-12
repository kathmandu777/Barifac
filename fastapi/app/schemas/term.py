from uuid import UUID

from pydantic import BaseModel


class BaseTermSchema(BaseModel):
    academic_year: int
    semester: str

    class Config:
        orm_mode = True


class CreateTermSchema(BaseTermSchema):
    pass


class UpdateTermSchema(BaseTermSchema):
    pass


class ReadTermSchema(BaseTermSchema):
    uuid: UUID
