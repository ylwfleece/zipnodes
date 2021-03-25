from flask import Blueprint, jsonify, session, request
from app.models import User, Project, db
from app.forms import ProjectForm
from flask_login import current_user, login_user, logout_user, login_required

project_routes = Blueprint('projects', __name__)

@project_routes.route('/update/<int:project_id>', methods=['GET'])
def update_project(project_id):
    """
    Updates a project.
    """
    project = Project.query.filter(Project.id == project_id).first()
    project.status = "Complete"
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict())


@project_routes.route('/', methods=['GET'])
def get_projects():
    """
    Gets all projects.
    """
    projects = Project.query.all()
    return_projects = []
    for project in projects:
        return_projects.append(project.to_dict())
    return jsonify(return_projects)
    

@project_routes.route('/', methods=['POST'])
def create_project():
    """
    Creates a project.
    """
    form = ProjectForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project(
            nonprofit_id = form.data['nonprofit_id'],
            title = form.data['title'],
            description = form.data['description'],
            millikarma_per_share = form.data['millikarma_per_share'],
            end_time = form.data['end_time'],
            cost_per_share = form.data['cost_per_share'],
            total_shares = form.data['total_shares']
        )
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    return 'invalid form'




