from app.models import db, User, environment, SCHEMA, Friend


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Yizhou', email='yizhou@aa.io', password='password', image_url='https://media.licdn.com/dms/image/C5603AQFk_0ySc7KuHA/profile-displayphoto-shrink_100_100/0/1516481604462?e=1676505600&v=beta&t=Mcy4taadYjrr5ntlJpBTwcjTF4VWw754dv7PskMEvQg')
    # marnie = User(
    #     username='Marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='Bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)

    NAMES = ['Rachel', 'Monica', 'Phoebe', 'Joey', 'Chandler', 'Ross']
    PROFILES = [
        'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-rachel.png?alt=media&token=0605bbe6-3987-4ada-b875-ddf4bc65416f',
        'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-monica.png?alt=media&token=53bfe2a2-fd5c-489f-b957-bdce631cc066',
        'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-pheobe.png?alt=media&token=b6d51729-02de-41e5-8eae-14170ae400d1',
        'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-joey.png?alt=media&token=01cda767-3cf5-47fb-a048-9b466a9c4a2e',
        'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-chandler.png?alt=media&token=fa36bcc3-dde5-4ca8-a2c5-e5cdf91fec8f',
        'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-ross.png?alt=media&token=e3f3898f-6978-4771-9728-284d2540eb3f'
    ]

    for i in range(6):
        user = User(username=NAMES[i], email=f'{NAMES[i].lower()}@aa.io', password='password', image_url=PROFILES[i])
        db.session.add(user)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()