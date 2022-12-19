from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Transaction, Comment, OpenRequest, db
from sqlalchemy import or_, and_, func

search_routes = Blueprint('searchs', __name__)


@search_routes.route('')
@login_required
def searchs():
    """
    Query for user, comments, transactions and requests corresponding to search keyword,
    and returns them in a list of search dictionaries
    """
    keyword = request.args.get('keyword').lower()

    matched_users = User.query.filter(
        or_(User.username.ilike(f'%{keyword}%'),
            User.email.ilike(f'%{keyword}%'))
    )

    matched_transactions = Transaction.query.filter(
        or_(Transaction.from_user_id==current_user.id,
            Transaction.to_user_id==current_user.id)
    ).filter(
        Transaction.note.ilike(f'%{keyword}%')
    )

    matched_requests = OpenRequest.query.filter(
        or_(OpenRequest.from_user_id == current_user.id,
            OpenRequest.to_user_id == current_user.id)
    ).filter(
        OpenRequest.note.ilike(f'%{keyword}%')
    )

    matched_comments = Comment.query.filter(
        Comment.body.ilike(f'%{keyword}%')
    )

    return {"Users": [user.to_dict() for user in matched_users],
            "Transactions": [transaction.to_dict_basics() for transaction in matched_transactions],
            "Requests": [request.to_dict_basics() for request in matched_requests],
            "Comments": [comment.to_dict_basics() for comment in matched_comments],
            }
