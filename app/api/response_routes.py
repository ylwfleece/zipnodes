from flask import Blueprint, jsonify, session, request
from app.models import User, Response, db
from app.forms import ResponseForm
from flask_login import current_user, login_user, logout_user, login_required

response_routes = Blueprint('responses', __name__)


@response_routes.route('/', methods=['GET'])
def get_responses():
    """
    Gets all responses.
    """
    responses = Response.query.all()
    return_responses = []
    for response in responses:
        return_responses.append(response.to_dict())
    return jsonify(return_responses)
    

@response_routes.route('/', methods=['POST'])
def create_response():
    """
    Creates a response.
    """
    form = ResponseForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        response = Response(
            node_id = form.data['node_id'],
            politic_id = form.data['politic_id'],
            answer = form.data['answer']
        )
        db.session.add(response)
        db.session.commit()
        return response.to_dict()
    return 'invalid form'




