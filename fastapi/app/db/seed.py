import random
from logging import getLogger

from app.crud import (
    AttendSubjectCRUD,
    DepartmentCRUD,
    EvaluationCRUD,
    SchoolCRUD,
    ScoreCRUD,
    SubjectCommentCRUD,
    SubjectCRUD,
    TeacherCommentCRUD,
    TeacherCRUD,
    UserCRUD,
)
from app.db.database import get_db_session
from app.models import Subject
from app.schemas import (
    CreateAttendSubjectSchemaForSeed,
    CreateScoreSchema,
    CreateSubjectCommentSchema,
    CreateTeacherCommentSchema,
    CreateUserSchema,
)
from sqlalchemy import and_, or_

logger = getLogger(__name__)

db_session = get_db_session()


def seed_users(users):
    for user in users:
        if not UserCRUD(db_session).get_by_email(user["email"]):
            user_schema = CreateUserSchema(
                username=user["username"],
                email=user["email"],
                password=user["password"],
                grade=user["grade"],
            )
            created_user = UserCRUD(db_session).create(user_schema.dict())
            logger.info(f"Created user: {created_user.username}")
        else:
            logger.info(f"Skipped user: {user['username']}")
    db_session.commit()


def seed_attend_subjects(users):
    for user_data in users:
        user = UserCRUD(db_session).get_by_email(user_data["email"])
        assert user is not None
        user_school = SchoolCRUD(db_session).get_by_name(user_data["school_name"])
        assert user_school is not None
        user_department = DepartmentCRUD(db_session).get_by_school_and_name(
            user_school, user_data["department_name"]
        )
        assert user_department is not None

        query = True
        query = and_(query, Subject.school_uuid == user_school.uuid)
        query = and_(query, Subject.target_grade == user_data["grade"])
        q_special = and_(
            Subject.department_uuid == user_department.uuid,
            Subject.category == "専門",
        )
        q_general = and_(
            Subject.department_uuid is None,
            Subject.category == "一般",
        )
        query = and_(query, or_(q_special, q_general))
        user_subjects = SubjectCRUD(db_session).gets(query)  # TODO: teacherが複数の場合に対応
        for subject in user_subjects:
            if AttendSubjectCRUD(db_session).get_by_user_and_subject(user, subject):
                logger.info(f"Skipped attend_subject: {subject.name} [{user.username}]")
                continue
            target_value_score = [["A", 80], ["B", 70], ["C", 60]][random.randint(0, 2)]
            attend_subject_schema = CreateAttendSubjectSchemaForSeed(
                user_uuid=user.uuid,
                subject_uuid=subject.uuid,
                target_value=target_value_score[0],
                target_score=target_value_score[1],
            )
            attend_subject = AttendSubjectCRUD(db_session).create(
                attend_subject_schema.dict()
            )
            logger.info(
                f"Created attend_subject: {attend_subject.subject.name} [{attend_subject.user.username}]"
            )
            db_session.commit()

            for evaluation in EvaluationCRUD(db_session).gets_by_subject_uuid(
                subject.uuid
            ):
                for _ in range(random.randint(1, 3)):
                    max_score = [50, 100][random.randint(0, 1)]
                    got_score = random.randint(10, max_score)
                    score_schema = CreateScoreSchema(
                        attend_subject_uuid=attend_subject.uuid,
                        evaluation_uuid=evaluation.uuid,
                        got_score=got_score,
                        max_score=max_score,
                    )
                    score = ScoreCRUD(db_session).create(score_schema.dict())
                    logger.info(
                        f"Created score: {got_score}/{max_score} "
                        f"({score.attend_subject.subject.name}-{score.evaluation.name}) "
                        f"[{score.attend_subject.user.username}]"
                    )
                db_session.commit()


def seed_teacher_comments(repertoires):
    users = UserCRUD(db_session).gets()
    teachers = TeacherCRUD(db_session).gets()
    for teacher in teachers:
        for user in users:
            if random.random() < 0.3:
                continue
            comment = repertoires[random.randint(0, len(repertoires) - 1)]
            teacher_comment_schema = CreateTeacherCommentSchema(
                user_uuid=user.uuid,
                teacher_uuid=teacher.uuid,
                comment=comment,
            )
            TeacherCommentCRUD(db_session).create(teacher_comment_schema.dict())
            logger.info(
                f"Created teacher_comment: {comment} by {user.username} [{teacher.name}]"
            )
    db_session.commit()


def seed_subject_comments(repertoires):
    users = UserCRUD(db_session).gets()
    subjects = SubjectCRUD(db_session).gets()
    for subject in subjects:
        for user in users:
            if random.random() < 0.3:
                continue
            comment = repertoires[random.randint(0, len(repertoires) - 1)]
            subject_comment_schema = CreateSubjectCommentSchema(
                user_uuid=user.uuid,
                subject_uuid=subject.uuid,
                comment=comment,
            )
            SubjectCommentCRUD(db_session).create(subject_comment_schema.dict())
            logger.info(
                f"Created subject_comment: {comment} by {user.username} [{subject.name}]"
            )
    db_session.commit()


def seed_all():
    from app.core.scraping_syllabus import (
        add_schools_and_departments,
        add_subjects_with_school_and_department,
    )

    from .data import (
        SUBJECT_COMMENT_REPERTOIRES,
        TARGET_DEPARTMENT_NAME,
        TARGET_SCHOOL_NAME,
        TEACHER_COMMENT_REPERTOIRES,
        USERS,
    )

    logger.info("Seeding data...")
    logger.info("Fetching schools and departments from syllabus...")
    add_schools_and_departments()

    logger.info(
        f"Fetching subjects of {TARGET_SCHOOL_NAME}-{TARGET_DEPARTMENT_NAME} from syllabus..."
    )
    add_subjects_with_school_and_department(TARGET_SCHOOL_NAME, TARGET_DEPARTMENT_NAME)

    logger.info("Seeding local data...")
    seed_users(USERS)
    seed_attend_subjects(USERS)
    seed_subject_comments(SUBJECT_COMMENT_REPERTOIRES)
    seed_teacher_comments(TEACHER_COMMENT_REPERTOIRES)
    logger.info("done")
