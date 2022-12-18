from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

from .transactions import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    balance = db.Column(db.BigInteger, nullable=False, default=50000)
    image_url = db.Column(db.String(255), nullable=False,
                          default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNi-GQCJpAnHe4oQ2WAys7QqD4kB4NlgH2kw&usqp=CAU")
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())

    transactions_from = db.relationship('Transactions', back_populates='user_from', foreign_key="from_user_id")
    transactions_to = db.relationship('Transactions', back_populates='user_to', foreign_key="to_user_id")

    requests_from = db.relationship('Transactions', back_populates='user_from', foreign_key="from_user_id")
    requests_to = db.relationship('Transactions', back_populates='user_to', foreign_key="to_user_id")

    liked_transactions = db.relationship('Transactions', secondary=likes, back_populates='likes')
    comments = db.relationship('Comments', back_populates='user')

    proxy_friends_from = db.relationship('Friends', back_populates='user_from', foreign_key="from_user_id" )
    friends_from = db.association_proxy('proxy_friends_from', 'user_from')

    proxy_friends_to = db.relationship('Friends', back_populates='user_to', foreign_key="to_user_id" )
    friends_to = db.association_proxy('proxy_friends_to', 'user_to')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'balance': self.balance,
            'imageUrl': self.image_url
        }
