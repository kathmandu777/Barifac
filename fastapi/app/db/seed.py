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
    TermCRUD,
    UserCRUD,
)
from app.db.database import get_db_session
from app.schemas import (
    CreateAttendSubjectSchemaForSeed,
    CreateDepartmentSchema,
    CreateEvaluationSchema,
    CreateSchoolSchema,
    CreateScoreSchema,
    CreateSubjectCommentSchema,
    CreateSubjectSchema,
    CreateTeacherCommentSchema,
    CreateTeacherSchema,
    CreateTermSchema,
    CreateUserSchema,
)

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
            logger.info(f"Created {created_user.username}")
        else:
            logger.info(
                f"Skipped to create {user['username']} because that user already exists."
            )
    db_session.commit()


def seed_schools(schools):
    for school in schools:
        if not SchoolCRUD(db_session).get_by_name(school["name"]):
            school_schema = CreateSchoolSchema(name=school["name"])
            created_school = SchoolCRUD(db_session).create(school_schema.dict())
            logger.info(f"Created {created_school.name}")
        else:
            logger.info(
                f"Skipped to create {school['name']} because that school already exists."
            )
    db_session.commit()


def seed_departments(departments):
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
            department_schema = CreateDepartmentSchema(
                school_uuid=school.uuid, name=department["name"]
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


def seed_terms(terms):
    for term in terms:
        if not TermCRUD(db_session).get_by_year_and_semester(
            term["academic_year"], term["semester"]
        ):
            term_schema = CreateTermSchema(
                academic_year=term["academic_year"], semester=term["semester"]
            )
            created_term = TermCRUD(db_session).create(term_schema.dict())
            logger.info(f"Created {created_term.academic_year}-{created_term.semester}")
        else:
            logger.info(
                f"Skipped to create {term['academic_year']}-{term['semester']} because that term already exists."
            )
    db_session.commit()


def seed_teachers(teachers):
    for teacher in teachers:
        school = SchoolCRUD(db_session).get_by_name(teacher["school_name"])
        if not school:
            logger.info(
                f"Skipped to create {teacher['name']} because that parent's school dose not exist."
            )
            continue

        if not TeacherCRUD(db_session).get_by_name_and_school(teacher["name"], school):
            teacher_schema = CreateTeacherSchema(
                school_uuid=school.uuid, name=teacher["name"]
            )
            created_teacher = TeacherCRUD(db_session).create(teacher_schema.dict())
            logger.info(f"Created {created_teacher.name}")
        else:
            logger.info(
                f"Skipped to create {teacher['name']} because that teacher already exists."
            )
    db_session.commit()


def seed_teacher_comments(teacher_comments):
    for teacher_comment in teacher_comments:
        user = UserCRUD(db_session).get_by_email(teacher_comment["user"]["email"])
        if not user:
            logger.info(
                f"Skipped to create {teacher_comment['teacher']['name']}-{teacher_comment['user']['username']}"
                f"-{teacher_comment['comment']} because that parent's user dose not exist."
            )
            continue

        school = SchoolCRUD(db_session).get_by_name(
            teacher_comment["teacher"]["school_name"]
        )
        if not school:
            logger.info(
                f"Skipped to create {teacher_comment['teacher']['name']}-{teacher_comment['user']['username']}"
                f"-{teacher_comment['comment']} because that parent's school dose not exist."
            )
            continue

        teacher = TeacherCRUD(db_session).get_by_name_and_school(
            teacher_comment["teacher"]["name"], school
        )
        if not teacher:
            logger.info(
                f"Skipped to create {teacher_comment['teacher']['name']}-{teacher_comment['user']['username']}"
                f"-{teacher_comment['comment']} because that parent's teacher dose not exist."
            )
            continue

        teacher_comment_scheme = CreateTeacherCommentSchema(
            teacher_uuid=teacher.uuid,
            user_uuid=user.uuid,
            comment=teacher_comment["comment"],
        )
        created_teacher_comment = TeacherCommentCRUD(db_session).create(
            teacher_comment_scheme.dict()
        )
        logger.info(
            f"Created {created_teacher_comment.teacher.name}-{created_teacher_comment.user.username}"
            f"-{created_teacher_comment.comment}"
        )
    db_session.commit()


def seed_subjects(subjects):
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
            subject_schema = CreateSubjectSchema(
                name=subject["name"],
                term_uuid=term.uuid,
                teacher_uuid=teacher.uuid,
                school_uuid=school.uuid,
                credits=subject["credits"],
            )
            created_subject = SubjectCRUD(db_session).create(subject_schema.dict())
            logger.info(f"Created {created_subject.name}")
        else:
            logger.info(
                f"Skipped to create {subject['name']} because that subject already exists."
            )

        # TODO: fix data structure and separete evaluation seed
        for evaluation in subject["evaluations"]:
            parent_subject = SubjectCRUD(db_session).get_by_name_term_school_teacher(
                subject["name"], term, school, teacher
            )
            if not EvaluationCRUD(db_session).get_by_name_and_subject(
                evaluation["name"], parent_subject
            ):
                evaluation_schema = CreateEvaluationSchema(
                    name=evaluation["name"],
                    rate=evaluation["rate"],
                    type=evaluation["type"],
                    subject_uuid=parent_subject.uuid,
                )
                created_evaluation = EvaluationCRUD(db_session).create(
                    evaluation_schema.dict()
                )
                logger.info(f"Created {created_evaluation.name}")
            else:
                logger.info(
                    f"Skipped to create {evaluation['name']} because that evaluation already exists."
                )
    db_session.commit()


def seed_attend_subjects(attend_subjects):
    for attend_subject in attend_subjects:
        user = UserCRUD(db_session).get_by_email(attend_subject["user"]["email"])
        if not user:
            logger.info(
                f"Skipped to create {attend_subject['subject']['name']}-{attend_subject['user']['username']}"
                " because that parent's user dose not exist."
            )
            continue

        school = SchoolCRUD(db_session).get_by_name(
            attend_subject["subject"]["school_name"]
        )
        if not school:
            logger.info(
                f"Skipped to create {attend_subject['subject']['name']}-{attend_subject['user']['username']}"
                "because that parent's school dose not exist."
            )
            continue

        teacher = TeacherCRUD(db_session).get_by_name_and_school(
            attend_subject["subject"]["teacher_name"], school
        )
        if not teacher:
            logger.info(
                f"Skipped to create {attend_subject['subject']['name']}-{attend_subject['user']['username']}"
                "because that parent's teacher dose not exist."
            )
            continue

        term = TermCRUD(db_session).get_by_year_and_semester(
            attend_subject["subject"]["term_year"],
            attend_subject["subject"]["term_semester"],
        )
        if not term:
            logger.info(
                f"Skipped to create {attend_subject['subject']['name']}-{attend_subject['user']['username']}"
                "because that parent's term dose not exist."
            )
            continue

        subject = SubjectCRUD(db_session).get_by_name_term_school_teacher(
            attend_subject["subject"]["name"], term, school, teacher
        )
        if not subject:
            logger.info(
                f"Skipped to create {attend_subject['name']} because that parent's subject dose not exist."
            )
            continue

        if not AttendSubjectCRUD(db_session).get_by_user_and_subject(user, subject):
            attend_subject_schema = CreateAttendSubjectSchemaForSeed(
                user_uuid=user.uuid,
                subject_uuid=subject.uuid,
                target_value=attend_subject["target_value"],
                target_score=attend_subject["target_score"],
            )
            created_attend_subject = AttendSubjectCRUD(db_session).create(
                attend_subject_schema.dict()
            )
            logger.info(
                f"Created {created_attend_subject.subject.name}-{created_attend_subject.user.username}"
            )
        else:
            logger.info(
                f"Skipped to create {attend_subject['subject']['name']}-{attend_subject['user']['username']}"
                "because that attend_subject already exists."
            )
    db_session.commit()


def seed_subject_comments(subject_comments):
    for subject_comment in subject_comments:
        subject_name = subject_comment["subject"]["name"]
        username = subject_comment["user"]["username"]

        term = TermCRUD(db_session).get_by_year_and_semester(
            subject_comment["subject"]["term_year"],
            subject_comment["subject"]["term_semester"],
        )
        if not term:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                " because that parent's term dose not exist."
            )
            continue

        user = UserCRUD(db_session).get_by_email(subject_comment["user"]["email"])
        if not user:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                " because that parent's user dose not exist."
            )
            continue

        school = SchoolCRUD(db_session).get_by_name(
            subject_comment["subject"]["school_name"],
        )
        if not school:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                " because that parent's school dose not exist."
            )
            continue

        teacher = TeacherCRUD(db_session).get_by_name_and_school(
            subject_comment["subject"]["teacher_name"],
            school,
        )
        if not teacher:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                " because that parent's teacher dose not exist."
            )
            continue

        subject = SubjectCRUD(db_session).get_by_name_term_school_teacher(
            subject_comment["subject"]["name"],
            term,
            school,
            teacher,
        )
        if not subject:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                " because that parent's subject dose not exist."
            )
            continue

        subject_comment_schema = CreateSubjectCommentSchema(
            subject_uuid=subject.uuid,
            user_uuid=user.uuid,
            comment=subject_comment["comment"],
        )
        created_subject_comment = SubjectCommentCRUD(db_session).create(
            subject_comment_schema.dict()
        )
        logger.info(
            f"Created {created_subject_comment.subject.name}-"
            f"{created_subject_comment.user.username}-{created_subject_comment.comment}"
        )
    db_session.commit()


# TODO: ユニーク制約ないので実行するたびに同じレコードが生成される
def seed_scores(scores):
    for score in scores:
        subject_name = score["attend_subject"]["subject"]["name"]
        username = score["attend_subject"]["user"]["username"]

        user = UserCRUD(db_session).get_by_email(
            score["attend_subject"]["user"]["email"]
        )
        if not user:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                f"-{score['got_score']}/{score['max_score']}"
                " because that parent's user dose not exist."
            )
            continue

        school = SchoolCRUD(db_session).get_by_name(
            score["attend_subject"]["subject"]["school_name"]
        )
        if not school:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                f"-{score['got_score']}/{score['max_score']}"
                "because that parent's school dose not exist."
            )
            continue

        teacher = TeacherCRUD(db_session).get_by_name_and_school(
            score["attend_subject"]["subject"]["teacher_name"], school
        )
        if not teacher:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                f"-{score['got_score']}/{score['max_score']}"
                "because that parent's teacher dose not exist."
            )
            continue

        term = TermCRUD(db_session).get_by_year_and_semester(
            score["attend_subject"]["subject"]["term_year"],
            score["attend_subject"]["subject"]["term_semester"],
        )
        if not term:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                f"-{score['got_score']}/{score['max_score']}"
                "because that parent's term dose not exist."
            )
            continue

        subject = SubjectCRUD(db_session).get_by_name_term_school_teacher(
            score["attend_subject"]["subject"]["name"], term, school, teacher
        )
        if not subject:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                f"-{score['got_score']}/{score['max_score']}"
                "because that parent's subject dose not exist."
            )
            continue

        attend_subject = AttendSubjectCRUD(db_session).get_by_user_and_subject(
            user, subject
        )
        if not attend_subject:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                f"-{score['got_score']}/{score['max_score']}"
                "because that attend_subject dose not exist."
            )
            continue

        evaluation = EvaluationCRUD(db_session).get_by_name_and_subject(
            score["evaluation"]["name"], subject
        )
        if not evaluation:
            logger.info(
                f"Skipped to create {subject_name}-{username}"
                f"-{score['got_score']}/{score['max_score']}"
                "because that evaluation dose not exist."
            )
            continue

        score_schema = CreateScoreSchema(
            attend_subject_uuid=attend_subject.uuid,
            evaluation_uuid=evaluation.uuid,
            got_score=score["got_score"],
            max_score=score["max_score"],
        )
        created_score = ScoreCRUD(db_session).create(score_schema.dict())
        logger.info(
            f"Created {created_score.attend_subject.subject.name}-{created_score.attend_subject.user.username}"
            f"{created_score.got_score}/{created_score.max_score}"
        )
    db_session.commit()


def seed_all():
    from .data import (
        ATTEND_SUBJECTS,
        DEPARTMENTS,
        SCHOOLS,
        SCORES,
        SUBJECT_COMMENTS,
        SUBJECTS,
        TEACHER_COMMENTS,
        TEACHERS,
        TERMS,
        USERS,
    )

    logger.info("Seeding data...")
    seed_users(USERS)
    seed_schools(SCHOOLS)
    seed_departments(DEPARTMENTS)
    seed_terms(TERMS)
    seed_teachers(TEACHERS)
    seed_subjects(SUBJECTS)
    seed_attend_subjects(ATTEND_SUBJECTS)
    seed_scores(SCORES)
    seed_subject_comments(SUBJECT_COMMENTS)
    seed_teacher_comments(TEACHER_COMMENTS)
    logger.info("done")
