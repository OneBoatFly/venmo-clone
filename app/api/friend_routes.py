from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Friend, db
# from app.forms import FriendForm
# from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_, and_

friend_routes = Blueprint('friends', __name__)


@friend_routes.route('')
@login_required
def friends():
    """
    Query for all friends of the current user, and returns them in a list of friend dictionaries
    """
    fds_from_ids = filter(lambda friend: friend.is_confirmed, current_user.friends_from)
    fds_to_ids = filter(lambda friend: friend.is_confirmed, current_user.friends_to)

    fds_from = [User.query.get(fds.to_user_id) for fds in fds_from_ids]
    fds_to = [User.query.get(fds.from_user_id) for fds in fds_to_ids]

    friends = [*fds_from, *fds_to]

    pending_from_ids = filter(lambda friend: not friend.is_confirmed, current_user.friends_from)
    pending_from = [User.query.get(fds.to_user_id) for fds in pending_from_ids]

    pending_to_ids = filter(lambda friend: not friend.is_confirmed, current_user.friends_to)
    pending_to = [User.query.get(fds.from_user_id) for fds in pending_to_ids]

    return {"Friends": [f.to_dict() for f in friends],
            'PendingFriendsFrom': [f.to_dict() for f in pending_from], 
            'PendingFriendsTo': [f.to_dict() for f in pending_to]}


@friend_routes.route('', methods=['POST'])
@login_required
def create_friend_request():
    """
    Create a friend and returns None
    """
    to_user_id = request.args.get('to_user_id')
    # print('------------------', to_user_id)
    if int(to_user_id) == current_user.id:
        return {'errors': 'You cannot send a friend request to yourself.'}, 401

    to_user = User.query.get(to_user_id)
    if not to_user:
        return {'errors': 'User not found.'}, 404

    friendship = Friend.query.filter(
        or_(and_(Friend.from_user_id == to_user_id, Friend.to_user_id == current_user.id), 
            and_(Friend.from_user_id == current_user.id, Friend.to_user_id == to_user_id))).first()

    if friendship:
        return {'errors': 'You already have a pending friend request with this user.'}, 401

    friend = Friend(
        from_user_id=current_user.id,
        to_user_id=to_user_id
    )

    db.session.add(friend)
    db.session.commit()
    return friend.to_dict_basics()


@friend_routes.route('', methods=['PATCH'])
@login_required
def confirm_friend():
    """
    Accept a friend by updating is_confirm to True and returns None
    """
    from_user_id = request.args.get('from_user_id')
    from_user = User.query.get(from_user_id)

    if from_user:
        friend = Friend.query.filter(
            Friend.from_user_id==from_user_id, 
            Friend.to_user_id==current_user.id).first()

        if not friend:
            return {'error': 'There is no friend request from this user.'}, 404

        friend.is_confirmed = True
        db.session.commit()
        return friend.to_dict_basics()

    return {'errors': 'User not found.'}, 404


@friend_routes.route('', methods=['DELETE'])
@login_required
def delete_friend():
    """
    Delete a friend and returns None
    """
    unfriend_user_id = request.args.get('unfriend_user_id')
    # print('delete friend route --------', unfriend_user_id)
    if int(unfriend_user_id) == current_user.id:
        return {'errors': 'You cannot unfriend yourself.'}, 401

    unfriend_user = User.query.get(unfriend_user_id)

    if not unfriend_user:
        return {'errors': 'User not found.'}, 404

    friendship = Friend.query.filter(
        or_(and_(Friend.from_user_id == unfriend_user_id, Friend.to_user_id == current_user.id),
            and_(Friend.from_user_id == current_user.id, Friend.to_user_id == unfriend_user_id))).first()

    # print('---------friendship --------', friendship)

    if not friendship:
        return {'errors': 'You are not a friend with this user.'}, 404
    
    db.session.delete(friendship)
    db.session.commit()
    return {'success': 'You unfriended this user.'}
