from typing import Optional
from uuid import UUID

from app.crud import SubjectCRUD
from app.models import Subject
from app.schemas import CreateSubjectSchema, UpdateSubjectSchema
from fastapi_pagination import Page, paginate
from sqlalchemy import and_

from fastapi import Request


class SubjectAPI:
    @classmethod
    def gets(
        cls,
        request: Request,
        school_uuid: Optional[UUID],
        department_uuid: Optional[UUID],
        term_uuid: Optional[UUID],
        target_grade: Optional[int],
        category: Optional[str],
        type: Optional[str],
    ) -> Page[Subject]:
        q = True
        if school_uuid:
            q = and_(q, Subject.school_uuid == school_uuid)
        if department_uuid:
            q = and_(q, (Subject.department_uuid == department_uuid))
        if term_uuid:
            q = and_(q, (Subject.term_uuid == term_uuid))
        if target_grade:
            q = and_(q, (Subject.target_grade == target_grade))
        if category:
            q = and_(q, (Subject.category == category))
        if type:
            q = and_(q, (Subject.type == type))
        return paginate(SubjectCRUD(request.state.db_session).gets(q))

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[Subject]:
        return SubjectCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateSubjectSchema) -> Subject:
        return SubjectCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateSubjectSchema
    ) -> Subject:
        return SubjectCRUD(request.state.db_session).update(uuid, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return SubjectCRUD(request.state.db_session).delete_by_uuid(uuid)
