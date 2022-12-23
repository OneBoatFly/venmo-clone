from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/nonfriends')
@login_required
def non_friend_users():
    """
    Query for all users that are not current user's friends and returns them in a list of user dictionaries
    """
    users = User.query.all()

    # get all pending or confirmed friend ids.
    fds_from_ids = [friendship.to_user_id for friendship in current_user.friends_from]
    fds_to_ids = [friendship.from_user_id for friendship in current_user.friends_to]

    friends = [*fds_from_ids, *fds_to_ids]

    non_friends = []
    for user in users:
        if user.id not in friends and user.id != current_user.id:
            non_friend = User.query.get(user.id)
            non_friends.append(non_friend.to_dict())
    
    return {'non_friend_users': non_friends}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return {'errors': 'User not found.'}, 404

    return user.to_dict_luxury()
