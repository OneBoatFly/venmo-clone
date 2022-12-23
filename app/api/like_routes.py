from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Transaction, db
from sqlalchemy import or_, and_

like_routes = Blueprint('likes', __name__)


@like_routes.route('', methods=['POST'])
@login_required
def create_like():
    """
    Create a like and returns None
    """
    transaction_id = request.args.get('transactionId')
    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return {'errors': 'Transaction not found.'}, 404
    
    likes = transaction.likes
    if current_user in likes:
        return {'errors': 'You already liked this transaction.'}, 401

    transaction.likes.append(current_user)
    db.session.commit()
    return transaction.to_dict_luxury()


@like_routes.route('', methods=['DELETE'])
@login_required
def delete_request():
    """
    Delete a like and returns None
    """
    transaction_id = request.args.get('transactionId')
    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return {'errors': 'Transaction not found.'}, 404

    likes = transaction.likes
    if current_user not in likes:
        return {'errors': 'You did not like this transaction.'}, 401

    transaction.likes.remove(current_user)
    db.session.commit()
    return transaction.to_dict_luxury()
