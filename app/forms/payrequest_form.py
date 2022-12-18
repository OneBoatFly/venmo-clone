from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def valid_receiver(form, field):
    # Checking if user exists
    to_user_id = field.data
    user = User.query.get(to_user_id)
    if not user:
        raise ValidationError('This user does not exist.')


def valid_amount(form, field):
    # Checking if amount is valid
    amount = field.data
    if amount <= 0:
        raise ValidationError('Amount must be greater than zero.')


def valid_note(form, field):
    # Checking if amount is valid
    note = field.data
    if len(note) == 0:
        raise ValidationError('Note is required.')
    elif len(note) > 255:
        raise ValidationError('Note must have 255 or less characeters.')


class PayRequestForm(FlaskForm):
    to_user_id = IntegerField('to_user_id', validators=[DataRequired(), valid_receiver])
    amount = IntegerField('amount', validators=[DataRequired(), valid_amount])
    note = StringField('note', validators=[DataRequired(), valid_note])
