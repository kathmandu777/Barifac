from logging import getLogger

from app.crud import SchoolCRUD, UserCRUD
from app.db.database import get_db_session
from app.schemas import BaseSchoolSchema, CreateUserSchema

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


def seed_all():
    logger.info("Seeding data...")
    seed_users()
    seed_schools()
    logger.info("done")
