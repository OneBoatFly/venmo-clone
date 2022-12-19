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
def create_transaction():
    """
    Create a transaction and returns the newly created transaction in a dictionary
    """
    form = PayRequestForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        with db.session.begin():
            user_from = User.query.get(current_user.id).populate_existing().with_for_update()
            user_to = User.query.get(
                form.data['to_user_id']).populate_existing().with_for_update()
            
            user_from.balance -= form.data['amount']
            user_to.balance += form.data['amount']

            transaction = Transaction(
                amount=form.data['amount'],
                note=form.data['note'],
                user_from=user_from,
                user_to=user_to
            )

            db.session.add(transaction)
        
        return transaction.to_dict_fancy()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
