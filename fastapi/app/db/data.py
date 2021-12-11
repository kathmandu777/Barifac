TERMS = [
    {"academic_year": 2020, "semester": "前期"},
    {"academic_year": 2020, "semester": "後期"},
    {"academic_year": 2021, "semester": "前期"},
]

SCHOOLS = [
    {"name": "豊田工業高等専門学校"},
    {"name": "鈴鹿工業高等専門学校"},
    {"name": "岐阜工業高等専門学校"},
]

DEPARTMENTS = [
    {"school_name": "豊田工業高等専門学校", "name": "情報工学科"},
    {"school_name": "豊田工業高等専門学校", "name": "電気電子システム工学科"},
    {"school_name": "豊田工業高等専門学校", "name": "環境都市工学科"},
]

SUBJECTS = [
    {
        "name": "国語2A",
        "term_year": 2020,
        "term_semester": "前期",
        "teacher_name": "豊田太郎",
        "school_name": "豊田工業高等専門学校",
        "credits": 1,
        "evaluations": [
            {"name": "中間テスト", "rate": 30, "type": "中間"},
            {"name": "定期テスト", "rate": 50, "type": "定期"},
            {"name": "課題", "rate": 20, "type": "課題"},
        ],
    },
    {
        "name": "国語2B",
        "term_year": 2020,
        "term_semester": "後期",
        "teacher_name": "豊田太郎",
        "school_name": "豊田工業高等専門学校",
        "credits": 1,
        "evaluations": [
            {"name": "中間試験", "rate": 30, "type": "中間"},
            {"name": "定期試験", "rate": 50, "type": "定期"},
            {"name": "課題", "rate": 20, "type": "課題"},
        ],
    },
]

USERS = [
    {"username": "test1", "email": "test1@example.com", "password": "password"},
    {"username": "test2", "email": "test2@example.com", "password": "password"},
]

ATTEND_SUBJECTS = [
    {"subject": SUBJECTS[0], "user": USERS[0], "target_value": "A", "target_score": 80},
    {"subject": SUBJECTS[1], "user": USERS[0], "target_value": "B", "target_score": 70},
    {"subject": SUBJECTS[0], "user": USERS[1], "target_value": "A", "target_score": 80},
]

TEACHERS = [
    {"name": "豊田太郎", "school_name": "豊田工業高等専門学校"},
    {"name": "鈴鹿太郎", "school_name": "鈴鹿工業高等専門学校"},
    {"name": "岐阜太郎", "school_name": "岐阜工業高等専門学校"},
]

SCORES = [
    {
        "attend_subject": ATTEND_SUBJECTS[0],
        "evaluation": ATTEND_SUBJECTS[0]["subject"]["evaluations"][0],
        "got_score": 80,
        "max_score": 100,
    },
    {
        "attend_subject": ATTEND_SUBJECTS[0],
        "evaluation": ATTEND_SUBJECTS[0]["subject"]["evaluations"][2],
        "got_score": 70,
        "max_score": 100,
    },
    {
        "attend_subject": ATTEND_SUBJECTS[0],
        "evaluation": ATTEND_SUBJECTS[0]["subject"]["evaluations"][2],
        "got_score": 45,
        "max_score": 50,
    },
]

TEACHER_COMMENTS = [
    {"teacher": TEACHERS[0], "user": USERS[0], "comment": "簡単でした"},
    {"teacher": TEACHERS[1], "user": USERS[1], "comment": "簡単でした"},
    {"teacher": TEACHERS[2], "user": USERS[2], "comment": "簡単でした"},
]
