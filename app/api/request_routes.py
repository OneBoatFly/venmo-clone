from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, OpenRequest, db
from app.forms import PayRequestForm, PayRequestEditForm
from .auth_routes import validation_errors_to_error_messages

request_routes = Blueprint('requests', __name__)


@request_routes.route('')
@login_required
def requests():
    """
    Query for all requests of the current user, and returns them in a list of request dictionaries
    """

    return {'RequestFroms': current_user.to_dict_luxury()['request_from'],      "RequestTos": current_user.to_dict_luxury()['request_to']}


@request_routes.route('', methods=['POST'])
@login_required
def create_open_request():
    """
    Create a request and returns the newly created request in a dictionary
    """
    form = PayRequestForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['to_user_id'] == current_user.id:
            return {'errors': 'You cannot make request to yourself.'}, 401

        open_request = OpenRequest(
            amount=form.data['amount'],
            note=form.data['note'],
        )

        open_request.user_from = current_user
        open_request.user_to = User.query.get(form.data['to_user_id'])
        db.session.add(open_request)
        db.session.commit()

        return open_request.to_dict_fancy()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@request_routes.route('/<int:requestId>', methods=['PUT'])
@login_required
def edit_open_request(requestId):
    """
    Edit a request and returns the updated request in a dictionary
    """
    form = PayRequestEditForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        open_request = OpenRequest.query.get(requestId)
        if open_request:
            open_request.amount = form.data['amount']
            open_request.note = form.data['note']
            db.session.commit()

            return open_request.to_dict_fancy()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@request_routes.route('/<int:requestId>', methods=['DELETE'])
@login_required
def delete_open_request(requestId):
    """
    Delete a request and returns None
    """
    open_request = OpenRequest.query.get(requestId)
    if open_request:
        db.session.delete(open_request)
        db.session.commit()
        return {'success': 'This request is deleted.'}

    return {'errors': 'Request is not found.'}, 404
