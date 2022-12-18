from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Comments(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    transaction_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('transactions.id')))
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.current_timestamp())

    user = db.relationship('Users', back_populates='comments')
    transaction = db.relationship('Transactions', back_populates='comments')

    def to_dict_fancy(self):
        return {
            'id': self.id,
            'body': self.body,
            'userId': self.user_id,
            'transactionId': self.transaction_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'user': self.user.to_dict(),
            'transaction': self.transaction.to_dict_basics()
        }

    def to_dict_basics(self):
        return {
            'id': self.id,
            'body': self.body,
            'userId': self.user_id,
            'transactionId': self.transaction_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
