from app.models import db, User, OpenRequest, environment, SCHEMA


def seed_requests():
    users = User.query.all()

    AMOUNTS = [
        5767,
        4761,
        5586,
        7526,
        3255,
        3888
    ]

    NOTES = [
        '2 vermicelli',
        'pho',
        'bun bo',
        'broken rice',
        'ramen + bar',
        'jubilee cheese'
    ]

    for j in range(len(users) - 1):
        for i in range(len(AMOUNTS)):
            request = OpenRequest(
                amount=AMOUNTS[i],
                note=NOTES[i]
            )
            request.user_from = users[j]
            request.user_to = users[i + 1]
            db.session.add(request)

    AMOUNT_P = [
        3767,
        2541,
        7546,
        7625,
        1255,
        4878
    ]

    NOTES_P = [
        'bobae',
        'pizza',
        'burger',
        'drinks',
        'sushi',
        'pie'
    ]

    for k in reversed(range(1, len(users))):
        request = OpenRequest(
            amount=AMOUNT_P[k - 1],
            note=NOTES_P[k - 1]
        )
        request.user_from = users[k]
        request.user_to = users[0]
        db.session.add(request)

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
