from app.models import db, User, Transaction, environment, SCHEMA


def seed_transactions():
    users = User.query.all()

    AMOUNTS = [
        2467,
        3761,
        4586,
        5126,
        1255,
        2988
    ]

    NOTES = [
        'Mashed potatoes',
        'Cranberry sauce',
        'Christmas ham',
        'Beef tenderloin',
        'Rack of lamb',
        'Green bean casserole'
    ]

    for j in range(len(users) - 1):
        for i in range(len(AMOUNTS)):
            transaction = Transaction(
                amount=AMOUNTS[i],
                note=NOTES[i]
            )
            transaction.user_from = users[j]
            transaction.user_to = users[i + 1]
            transaction.likes = [users[j]]
            db.session.add(transaction)

    AMOUNT_P = [
        377,
        2541,
        1546,
        57625,
        1855,
        4868
    ]

    NOTES_P = [
        'cookies',
        'fruitcake',
        'gingerbread houses',
        'bourbon balls',
        'pecan tassies',
        'eggnog'
    ]

    for k in reversed(range(1, len(users))):
        transaction = Transaction(
            amount=AMOUNT_P[k - 1],
            note=NOTES_P[k - 1]
        )
        transaction.user_from = users[k]
        transaction.user_to = users[0]
        db.session.add(transaction)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE; TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")
        db.session.execute("DELETE FROM likes")

    db.session.commit()
