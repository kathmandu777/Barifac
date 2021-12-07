from logging import getLogger

from app.crud import (
    DepartmentCRUD,
    SchoolCRUD,
    SubjectCRUD,
    TeacherCRUD,
    TermCRUD,
    UserCRUD,
)
from app.db.database import get_db_session
from app.schemas import (
    BaseDepartmentSchema,
    BaseSchoolSchema,
    BaseSubjectSchema,
    BaseTeacherSchema,
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


def seed_teachers():
    teachers = [
        {"name": "豊田太郎", "school_name": "豊田工業高等専門学校"},
        {"name": "鈴鹿太郎", "school_name": "鈴鹿工業高等専門学校"},
        {"name": "岐阜太郎", "school_name": "岐阜工業高等専門学校"},
    ]

    for teacher in teachers:
        school = SchoolCRUD(db_session).get_by_name(teacher["school_name"])
        if not school:
            logger.info(
                f"Skipped to create {teacher['name']} because that parent's school dose not exist."
            )
            continue
        if not TeacherCRUD(db_session).get_by_name_and_school(teacher["name"], school):
            teacher_schema = BaseTeacherSchema(school=school, name=teacher["name"])
            created_teacher = TeacherCRUD(db_session).create(teacher_schema.dict())
            logger.info(f"Created {created_teacher.name}")
        else:
            logger.info(
                f"Skipped to create {teacher['name']} because that teacher already exists."
            )
    db_session.commit()


def seed_subjects():
    subjects = [
        {
            "name": "国語2A",
            "term_year": 2020,
            "term_semester": "前期",
            "teacher_name": "豊田太郎",
            "school_name": "豊田工業高等専門学校",
            "credits": 1,
        },
        {
            "name": "国語2B",
            "term_year": 2020,
            "term_semester": "後期",
            "teacher_name": "豊田太郎",
            "school_name": "豊田工業高等専門学校",
            "credits": 1,
        },
    ]

    for subject in subjects:
        school = SchoolCRUD(db_session).get_by_name(subject["school_name"])
        if not school:
            logger.info(
                f"Skipped to create {subject['name']} because that parent's school dose not exist."
            )
            continue

        teacher = TeacherCRUD(db_session).get_by_name_and_school(
            subject["teacher_name"], school
        )
        if not teacher:
            logger.info(
                f"Skipped to create {subject['name']} because that parent's teacher dose not exist."
            )
            continue

        term = TermCRUD(db_session).get_by_year_and_semester(
            subject["term_year"], subject["term_semester"]
        )
        if not term:
            logger.info(
                f"Skipped to create {subject['name']} because that parent's term dose not exist."
            )
            continue

        if not SubjectCRUD(db_session).get_by_name_term_school_teacher(
            subject["name"], term, school, teacher
        ):
            subject_schema = BaseSubjectSchema(
                name=subject["name"],
                term=term,
                teacher=teacher,
                school=school,
                credits=subject["credits"],
            )
            created_subject = SubjectCRUD(db_session).create(subject_schema.dict())
            logger.info(f"Created {created_subject.name}")
        else:
            logger.info(
                f"Skipped to create {subject['name']} because that subject already exists."
            )
    db_session.commit()


def seed_all():
    logger.info("Seeding data...")
    seed_users()
    seed_schools()
    seed_departments()
    seed_terms()
    seed_teachers()
    seed_subjects()
    logger.info("done")
