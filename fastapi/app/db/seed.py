from logging import getLogger

from app.crud import (
    AttendSubjectCRUD,
    DepartmentCRUD,
    EvaluationCRUD,
    SchoolCRUD,
    ScoreCRUD,
    SubjectCRUD,
    TeacherCRUD,
    TermCRUD,
    UserCRUD,
)
from app.db.database import get_db_session
from app.schemas import (
    BaseAttendSubjectSchema,
    BaseDepartmentSchema,
    BaseEvaluationSchema,
    BaseSchoolSchema,
    BaseScoreSchema,
    BaseSubjectSchema,
    BaseTeacherSchema,
    BaseTermSchema,
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
            school_schema = BaseSchoolSchema(name=school["name"])
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


def seed_terms(terms):
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


def seed_teachers(teachers):
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

        for evaluation in subject["evaluations"]:
            parent_subject = SubjectCRUD(db_session).get_by_name_term_school_teacher(
                subject["name"], term, school, teacher
            )
            if not EvaluationCRUD(db_session).get_by_name_and_subject(
                evaluation["name"], parent_subject
            ):
                evaluation_schema = BaseEvaluationSchema(
                    name=evaluation["name"],
                    rate=evaluation["rate"],
                    type=evaluation["type"],
                    subject=parent_subject,
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
            attend_subject_schema = BaseAttendSubjectSchema(
                user=user,
                subject=subject,
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

        score_schema = BaseScoreSchema(
            attend_subject=attend_subject,
            evaluation=evaluation,
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
        SUBJECTS,
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
    logger.info("done")
