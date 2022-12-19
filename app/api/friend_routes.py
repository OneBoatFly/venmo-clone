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
    friends = current_user.to_dict_luxury()['friends']
    pending_from = current_user.to_dict_luxury()['pending_friends_from']
    pending_to = current_user.to_dict_luxury()['pending_friends_to']
    
    return {"Friends": friends, 'PendingFriendsFrom': pending_from, 'PendingFriendsTo': pending_to}


@friend_routes.route('', methods=['POST'])
@login_required
def create_friend_request():
    """
    Create a friend and returns None
    """
    to_user_id = request.args.get('to_user_id')
    to_user = User.query.get(to_user_id)

    friendship = Friend.query.filter(
        or_(and_(Friend.from_user_id == to_user_id, Friend.to_user_id == current_user.id), 
            and_(Friend.from_user_id == current_user.id, Friend.to_user_id == to_user_id))).first()

    if friendship:
        return {'errors': 'You already have a pending friend request with this user.'}, 401

    if not to_user:
        return {'errors': 'User not found.'}, 404

    friend = Friend(
        from_user_id=current_user.id,
        to_user_id=to_user_id
    )

    db.session.add(friend)
    db.session.commit() 


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

        friend.is_confirmed = True
        db.session.commit()

    return {'errors': 'User not found.'}, 404


@friend_routes.route('', methods=['DELETE'])
@login_required
def delete_friend():
    """
    Delete a friend and returns None
    """
    unfriend_user_id = request.args.get('unfriend_user_id')
    unfriend_user = User.query.get(unfriend_user_id)

    if not unfriend_user:
        return {'errors': 'User not found.'}, 404

    friendship = Friend.query.filter(
        or_(and_(Friend.from_user_id == unfriend_user_id, Friend.to_user_id == current_user.id),
            and_(Friend.from_user_id == current_user.id, Friend.to_user_id == unfriend_user_id))).first()

    if not friendship:
        return {'errors': 'You are not a friend with this user.'}, 404
    
    db.session.remove(friendship)
    db.session.commit()
