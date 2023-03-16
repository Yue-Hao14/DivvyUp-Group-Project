from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_friends():
    demo = User.query.filter_by(username='Demo').first()
    john = User.query.filter_by(username='JohnSmith').first()
    jane = User.query.filter_by(username='JaneDoe').first()
    nick = User.query.filter_by(username='NickArakaki').first()
    yue = User.query.filter_by(username='YueHao').first()
    tuan = User.query.filter_by(username='TuanTran').first()
    troy = User.query.filter_by(username='TroyLee').first()


    demo.friends.append(john)
    demo.friends.append(nick)
    demo.friends.append(jane)
    demo.friends.append(troy)

    troy.friends.append(demo)

    nick.friends.append(demo)
    nick.friends.append(john)

    john.friends.append(jane)
    john.friends.append(demo)
    john.friends.append(nick)


    jane.friends.append(demo)
    jane.friends.append(yue)
    jane.friends.append(tuan)
    jane.friends.append(john)

    yue.friends.append(jane)

    tuan.friends.append(jane)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_friends"))

    db.session.commit()
