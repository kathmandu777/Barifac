from uuid import UUID

from pydantic import BaseModel, Field


class BaseTermSchema(BaseModel):
    academic_year: int = Field(..., ge=2000, le=2100)
    semester: str

    class Config:
        orm_mode = True


class CreateTermSchema(BaseTermSchema):
    pass


class UpdateTermSchema(BaseTermSchema):
    pass


class ReadTermSchema(BaseTermSchema):
    uuid: UUID
