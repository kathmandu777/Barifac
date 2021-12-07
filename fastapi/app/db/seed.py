from logging import getLogger

from app.crud import DepartmentCRUD, SchoolCRUD, TermCRUD, UserCRUD
from app.db.database import get_db_session
from app.schemas import (
    BaseDepartmentSchema,
    BaseSchoolSchema,
    BaseTermSchema,
    CreateUserSchema,
)

logger = getLogger(__name__)

db_session = get_db_session()


def seed_users():
    users = [
        {"username": "test1", "email": "test1@example.com", "password": "password"},
        {"username": "test2", "email": "test2@example.com", "password": "password"},
    ]

    for user in users:
        if not UserCRUD(db_session).get_by_email(user["email"]):
            user_schema = CreateUserSchema(
                username=user["username"],
                email=user["email"],
                password=user["password"],
            )
            created_user = UserCRUD(db_session).create(user_schema.dict())
            logger.info(f"Created {created_user.username}")
        else:
            logger.info(
                f"Skipped to create {user['username']} because that user already exists."
            )
    db_session.commit()


def seed_schools():
    schools = [
        {"name": "豊田工業高等専門学校"},
        {"name": "鈴鹿工業高等専門学校"},
        {"name": "岐阜工業高等専門学校"},
    ]

    for school in schools:
        if not SchoolCRUD(db_session).get_by_name(school["name"]):
            school_schema = BaseSchoolSchema(name=school["name"])
            created_school = SchoolCRUD(db_session).create(school_schema.dict())
            logger.info(f"Created {created_school.name}")
        else:
            logger.info(
                f"Skipped to create {school['name']} because that school already exists."
            )
    db_session.commit()


def seed_departments():
    departments = [
        {"school_name": "豊田工業高等専門学校", "name": "情報工学科"},
        {"school_name": "豊田工業高等専門学校", "name": "電気電子システム工学科"},
        {"school_name": "豊田工業高等専門学校", "name": "環境都市工学科"},
    ]

    for department in departments:
        school = SchoolCRUD(db_session).get_by_name(department["school_name"])
        if not school:
            logger.info(
                f"Skipped to create {department['name']} because that parent's school dose not exist."
            )
            continue
        if not DepartmentCRUD(db_session).get_by_school_and_name(
            school, department["name"]
        ):
            department_schema = BaseDepartmentSchema(
                school=school, name=department["name"]
            )
            created_department = DepartmentCRUD(db_session).create(
                department_schema.dict()
            )
            logger.info(f"Created {created_department.name}")
        else:
            logger.info(
                f"Skipped to create {department['name']} because that department already exists."
            )
    db_session.commit()


def seed_terms():
    terms = [
        {"academic_year": 2020, "semester": "前期"},
        {"academic_year": 2020, "semester": "後期"},
        {"academic_year": 2021, "semester": "前期"},
    ]

    for term in terms:
        if not TermCRUD(db_session).get_by_year_and_semester(
            term["academic_year"], term["semester"]
        ):
            term_schema = BaseTermSchema(
                academic_year=term["academic_year"], semester=term["semester"]
            )
            created_term = TermCRUD(db_session).create(term_schema.dict())
            logger.info(f"Created {created_term.academic_year}-{created_term.semester}")
        else:
            logger.info(
                f"Skipped to create {term['academic_year']}-{term['semester']} because that term already exists."
            )
    db_session.commit()


def seed_all():
    logger.info("Seeding data...")
    seed_users()
    seed_schools()
    seed_departments()
    seed_terms()
    logger.info("done")
