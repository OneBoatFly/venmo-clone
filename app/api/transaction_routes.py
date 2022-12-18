from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Transaction, db
from app.forms import PayRequestForm
from .auth_routes import validation_errors_to_error_messages

transaction_routes = Blueprint('transactions', __name__)


@transaction_routes.route('')
@login_required
def transactions():
    """
    Query for all transactions of the current user and its friends, and returns them in a list of transaction dictionaries
    """
    user_transactions = current_user.to_dict_luxury()['transactions']

    friends = current_user.friends
    friends_transactions = [friend.to_dict_luxury()['transactions'] for friend in friends]

    return {'UserTransactions': user_transactions, "FriendsTransactions": friends_transactions}


@transaction_routes.route('/<int:id>')
@login_required
def transaction(id):
    """
    Query for a transaction by id and returns that transaction in a dictionary
    """
    transaction = Transaction.query.get(id)
    return transaction.to_dict_luxury()


@transaction_routes.route('', methods=['POST'])
@login_required
def create_transaction(id):
    """
    Create a transaction and returns the newly created transaction in a dictionary
    """
    form = PayRequestForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction = Transaction(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    return transaction.to_dict_luxury()
