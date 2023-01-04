from app.models import db, User, Comment, environment, SCHEMA

def seed_comments():
    user1 = User.query.get(1)
    user2 = User.query.get(2)

    for transaction in user1.transactions_from:
        for j in range(2):
            comment = Comment(
                body=f'Good food {j + 1}',
                transaction=transaction,
                user=user1
            )
            db.session.add(comment)

    for transaction in user2.transactions_to:
        for j in range(2):
            comment = Comment(
                body=f'Great lunch {j + 1}',
                transaction=transaction,
                user=user2
            )
            db.session.add(comment)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
