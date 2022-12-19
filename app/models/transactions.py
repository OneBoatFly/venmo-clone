from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='cascade'), primary_key=True),
    db.Column('transaction_id', db.Integer, db.ForeignKey(add_prefix_for_prod('transactions.id'), ondelete='cascade'), primary_key=True),
)

if environment == "production":
    likes.schema = SCHEMA

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    to_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    amount = db.Column(db.BigInteger, nullable=False)
    note = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())

    user_from = db.relationship('User', back_populates='transactions_from', foreign_keys=[from_user_id])
    user_to = db.relationship('User', back_populates='transactions_to', foreign_keys=[to_user_id])

    likes = db.relationship('User', secondary=likes, back_populates='liked_transactions')

    comments = db.relationship('Comment', back_populates='transaction')
    
    def to_dict_luxury(self):
        return {
            'id': self.id,
            'fromUserId': self.from_user_id,
            'toUserId': self.to_user_id,
            'amount': self.amount,
            'note': self.note,
            'createdAt': self.created_at,
            'fromUser': self.user_from.to_dict(),
            'toUser': self.user_to.to_dict(),
            'numOfLikes': len(self.likes),
            'numOfComments': len(self.comments),
            'comments': [comment.to_dict_basic() for comment in self.comments]
        }

    def to_dict_fancy(self):
        return {
            'id': self.id,
            'fromUserId': self.from_user_id,
            'toUserId': self.to_user_id,
            'amount': self.amount,
            'note': self.note,
            'createdAt': self.created_at,
            'fromUser': self.user_from.to_dict(),
            'toUser': self.user_to.to_dict(),
            'numOfLikes': len(self.likes),
            'numOfComments': len(self.comments)
        }

    def to_dict_basics(self):
        return {
            'id': self.id,
            'fromUserId': self.from_user_id,
            'toUserId': self.to_user_id,
            'amount': self.amount,
            'note': self.note,
            'createdAt': self.created_at
        }
