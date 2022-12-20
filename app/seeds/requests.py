from app.models import db, User, OpenRequest, environment, SCHEMA


def seed_requests():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    for i in range(3):
        request1 = OpenRequest(
            amount=(i + 1) * 10000,
            note=f'Lunch {i + 1}'
        )

        request1.user_from = user1
        request1.user_to = user2
        db.session.add(request1)

        request2 = OpenRequest(
            amount=(i + 1) * 5000,
            note=f'Dinner {i + 1}'
        )

        request2.user_from = user3
        request2.user_to = user1
        db.session.add(request2)

        request3 = OpenRequest(
            amount=(i + 1) * 500,
            note=f'Breakfast {i + 1}'
        )

        request3.user_from = user3
        request3.user_to = user2
        db.session.add(request3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_requests():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.open_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM open_requests")

    db.session.commit()
