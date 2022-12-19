from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Transaction, User


def valid_body(form, field):
    # Checking if body is valid
    body = field.data
    if len(body) == 0:
        raise ValidationError('Comment cannot be empty.')
    elif len(body) > 255:
        raise ValidationError('Comment must have 255 or less characeters.')


class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired(), valid_body])
