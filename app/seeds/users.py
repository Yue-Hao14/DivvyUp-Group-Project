from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        first_name="Demo",
        last_name="User",
        email='demo@user.com',
        password='password')
    John = User(
        username='JohnSmith',
        first_name="John",
        last_name="Smith",
        email='johnsmith@user.com',
        password='password')
    Jane = User(
        username='JaneDoe',
        first_name="Jane",
        last_name="Doe",
        email='janedoe@user.com',
        password='password')
    Nick = User(
        username='NickArakaki',
        first_name="Nick",
        last_name="Arakaki",
        email='nickarakaki@user.com',
        password='password')
    Yue = User(
        username='YueHao',
        first_name="Yue",
        last_name="Hao",
        email='yuehao@user.com',
        password='password')
    Tuan = User(
        username='TuanTran',
        first_name="Tuan",
        last_name="Tran",
        email='tuantran@user.com',
        password='password')
    Troy = User(
        username='TroyLee',
        first_name="Troy",
        last_name="Lee",
        email='troylee@user.com',
        password='password')

    db.session.add(demo)
    db.session.add(John)
    db.session.add(Jane)
    db.session.add(Nick)
    db.session.add(Yue)
    db.session.add(Tuan)
    db.session.add(Troy)
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
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
