from flask import Blueprint, jsonify, session, request
from app.models import User, Politic, db
from app.forms import PoliticForm
from flask_login import current_user, login_user, logout_user, login_required

politic_routes = Blueprint('politics', __name__)


@politic_routes.route('/', methods=['GET'])
def get_politics():
    """
    Gets all politics.
    """
    politics = Politic.query.all()
    return_politics = []
    for politic in politics:
        return_politics.append(politic.to_dict())
    return jsonify(return_politics)
    

@politic_routes.route('/', methods=['POST'])
def create_politic():
    """
    Creates a politic.
    """
    form = PoliticForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        politic = Politic(
            nonprofit_id = form.data['nonprofit_id'],
            title = form.data['title'],
            description = form.data['description'],
            question = form.data['question'],
            end_time = form.data['end_time']
        )
        db.session.add(politic)
        db.session.commit()
        return politic.to_dict()
    return 'invalid form'




