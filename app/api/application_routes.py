from flask import Blueprint, jsonify, session, request
from app.models import User, Application, db
from app.forms import ApplicationForm
from flask_login import current_user, login_user, logout_user, login_required

application_routes = Blueprint('applications', __name__)


@application_routes.route('/', methods=['GET'])
def get_applications():
    """
    Gets all applications.
    """
    applications = Application.query.all()
    return_applications = []
    for application in applications:
        return_applications.append(application.to_dict())
    return jsonify(return_applications)
    

@application_routes.route('/', methods=['POST'])
def create_application():
    """
    Creates an application.
    """
    form = ApplicationForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('>>>>>>> form validated:', form.data)
        application = Application(
            order_id = form.data['order_id'],
            node_id = form.data['node_id'],
        )
        db.session.add(application)
        db.session.commit()
        return application.to_dict()
    return 'invalid form'

