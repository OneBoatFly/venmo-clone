from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class OpenRequests(db.Model):
    __tablename__ = 'open_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    to_user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    amount = db.Column(db.BigInteger, nullable=False)
    note = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.current_timestamp())

    user_from = db.relationship(
        'Users', back_populates='request_from', foreign_key="from_user_id")
    user_to = db.relationship(
        'Users', back_populates='request_to', foreign_key="to_user_id")

    def to_dict_fancy(self):
        return {
            'id': self.id,
            'fromUserId': self.from_user_id,
            'toUserId': self.to_user_id,
            'amount': self.amount,
            'note': self.note,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'fromUser': self.user_from.to_dict(),
            'toUser': self.user_to.to_dict(),
        }

    def to_dict_basics(self):
        return {
            'id': self.id,
            'fromUserId': self.from_user_id,
            'toUserId': self.to_user_id,
            'amount': self.amount,
            'note': self.note,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
