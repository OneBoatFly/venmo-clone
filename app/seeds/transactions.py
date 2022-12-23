from app.models import db, User, Transaction, environment, SCHEMA


def seed_transactions():
    user1 = User.query.get(1)
    user2 = User.query.get(2)

    for i in range(3):
        transaction = Transaction(
            amount=(i + 1) * 10000,
            note=f'Dinner {i + 1}'
        )

        transaction.user_from = user1
        transaction.user_to = user2
        transaction.likes = [user1]
        db.session.add(transaction)

    user3 = User.query.get(3)
    for i in range(3):
        transaction = Transaction(
            amount=(i + 1) * 10000,
            note=f'Dinner {i + 1}'
        )

        transaction.user_from = user2
        transaction.user_to = user3
        transaction.likes = [user3]
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
