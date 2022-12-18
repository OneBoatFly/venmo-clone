from app.models import db, User, Friend, environment, SCHEMA, Friend


def seed_friends():
    users = User.query.all()

    for i in range(len(users)):
        user1 = users[i]
        for j in range(len(users)):
            if j != i:
                user2 = users[j]
                is_confirmed = j % 2 == 0
                friend = Friend(
                    from_user_id= user1.id,
                    to_user_id = user2.id,
                    is_confirmed=is_confirmed
                )
                db.session.add(friend)
                
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")

    db.session.commit()
