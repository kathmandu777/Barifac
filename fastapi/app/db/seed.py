from app.crud import UserCRUD
from app.schemas import CreateUserSchema
from database import get_db_session

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
            print(f"Created {created_user.username}")
        else:
            print(
                f"Skipped to create {user['username']} because that user is already exists."
            )
    db_session.commit()


if __name__ == "__main__":
    print("Seeding data...")
    # call seed function for each model
    seed_users()
    print("done")
