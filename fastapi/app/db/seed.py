from database import local_session

db = local_session()


if __name__ == "__main__":
    print("Seeding data...")
    # call seed function for each model
    print("done")
