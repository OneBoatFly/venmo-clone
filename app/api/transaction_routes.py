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
    user_transactions_ids = [tran['id'] for tran in user_transactions]

    fds_from_ids = filter(lambda friend: friend.is_confirmed, current_user.friends_from)
    fds_to_ids = filter(lambda friend: friend.is_confirmed, current_user.friends_to)
    fds_from = [User.query.get(fds.to_user_id).to_dict_luxury() for fds in fds_from_ids]
    fds_to = [User.query.get(fds.from_user_id).to_dict_luxury() for fds in fds_to_ids]
    friends = [*fds_from, *fds_to]

    friends_transactions = []
    friend_trans_dups = []
    
    for f in friends:
        friend_trans = f['transactions']
        for t in friend_trans:
            if t['id'] not in user_transactions_ids and t['id'] not in friend_trans_dups:
                friends_transactions.append(t)  
                friend_trans_dups.append(t['id'])

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
        if form.data['to_user_id'] == current_user.id:
            return {'error': 'You cannot transfer fund to yourself.'}, 401
        
        # user_from = User.query.with_for_update(of=User).filter_by(id=current_user.id).first()
        # user_to = User.query.with_for_update(of=User).filter_by(id=form.data['to_user_id']).first()
        user_from = db.session.query(User).populate_existing().with_for_update(of=User.balance).filter_by(id=current_user.id).first()
        user_to = db.session.query(User).populate_existing().with_for_update(of=User.balance).filter_by(id=form.data['to_user_id']).first()

        if user_from.balance < form.data['amount']:
            return {'error': 'insufficient fund.'}

        user_from.balance -= form.data['amount']
        user_to.balance += form.data['amount']

        transaction = Transaction(
            amount=form.data['amount'],
            note=form.data['note'],
            user_from=user_from,
            user_to=user_to
        )

        db.session.add(transaction)
        db.session.commit()
        
        return transaction.to_dict_fancy()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# to remove
@transaction_routes.route('/<int:transaction_id>', methods=['DELETE'])
@login_required
def delete_transaction(transaction_id):
    t = Transaction.query.get(transaction_id)
    db.session.delete(t)
    db.session.commit()

    return 'deleted'
