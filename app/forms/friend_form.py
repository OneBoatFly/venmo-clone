from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Friend, User


def valid_receiver(form, field):
    # Checking if user exists
    to_user_id = field.data
    user = User.query.get(to_user_id)
    if not user:
        raise ValidationError('This user does not exist.')


def valid_confirmation(form, field):
    is_confirmed = field.data
    if not isinstance(is_confirmed, bool):
        raise ValidationError('Must provide a boolean.')


class FriendForm(FlaskForm):
    to_user_id = IntegerField('to_user_id', validators=[DataRequired(), valid_receiver])
    is_confirmed = BooleanField('is_confirmed', validators=[valid_confirmation])
