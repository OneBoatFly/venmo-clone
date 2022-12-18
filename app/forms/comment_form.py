from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Transaction


def valid_transaction(form, field):
    # Checking if transaction exists
    transaction_id = field.data
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        raise ValidationError('This transaction does not exist.')

def valid_body(form, field):
    # Checking if body is valid
    body = field.data
    if len(body) == 0:
        raise ValidationError('Comment cannot be empty.')
    elif len(body) > 255:
        raise ValidationError('Comment must have 255 or less characeters.')


class CommentForm(FlaskForm):
    transaction_id = IntegerField('transaction_id', validators=[DataRequired(), valid_transaction])
    body = StringField('body', validators=[DataRequired(), valid_body])
