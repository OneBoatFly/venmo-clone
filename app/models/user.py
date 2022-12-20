from .db import db, environment, SCHEMA, add_prefix_for_prod
from .friends import Friend
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

    transactions_from = db.relationship('Transaction', back_populates='user_from', foreign_keys='Transaction.from_user_id')
    transactions_to = db.relationship('Transaction', back_populates='user_to', foreign_keys='Transaction.to_user_id')

    requests_from = db.relationship('OpenRequest', back_populates='user_from', foreign_keys='OpenRequest.from_user_id')
    requests_to = db.relationship('OpenRequest', back_populates='user_to', foreign_keys='OpenRequest.to_user_id')

    friends_from = db.relationship('Friend', backref='from', primaryjoin=id==Friend.from_user_id)
    friends_to = db.relationship('Friend', backref='to', primaryjoin=id==Friend.to_user_id)
    
    liked_transactions = db.relationship('Transaction', secondary=likes, back_populates='likes')
    comments = db.relationship('Comment', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def sort_transactions_by_time(self):
        fromArr = [transaction.to_dict_fancy() for transaction in self.transactions_from]
        toArr = [transaction.to_dict_fancy() for transaction in self.transactions_to]
        all_transactions = [*fromArr, *toArr]
        all_transactions.sort(key=lambda transaction: transaction['createdAt'], reverse=True)
        return all_transactions

    def sort_request_by_time(self, requests):
        requestsArr = [request.to_dict_fancy() for request in requests]
        sorted_requests = sorted(requestsArr, key=lambda request: request['createdAt'], reverse=True)
        return sorted_requests

    def to_dict_luxury(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'balance': self.balance,
            'imageUrl': self.image_url,
            'transactions': self.sort_transactions_by_time(),
            'request_from': self.sort_request_by_time(self.requests_from),
            'request_to': self.sort_request_by_time(self.requests_to),
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            # 'balance': self.balance,
            'imageUrl': self.image_url
        }
