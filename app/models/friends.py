from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    from_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    to_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    is_confirmed = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict_basics(self):
        return {
            'fromUserId': self.from_user_id,
            'toUserId': self.to_user_id,
            'isConfirmed': self.is_confirmed,
        }
