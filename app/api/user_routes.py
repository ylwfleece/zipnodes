from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Review

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    reviews = []
    if not user.nonprofit:
        reviews = Review.query.filter(Review.node_id == user.id).filter(Review.writer_id != user.id).all()
    else:
        reviews = Review.query.filter(Review.nonprofit_id == user.id).filter(Review.writer_id != user.id).all()
    for rev in reviews:
        user.score += rev.score 
        if rev.score > 1:
            user.karma += rev.application.karma 
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
