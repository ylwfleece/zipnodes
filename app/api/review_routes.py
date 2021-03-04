from flask import Blueprint, jsonify, session, request
from app.models import User, Review, db
from app.forms import ReviewForm
from flask_login import current_user, login_user, logout_user, login_required

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/', methods=['GET'])
def get_reviews():
    """
    Gets all reviews.
    """
    reviews = Review.query.all()
    return_reviews = []
    for review in reviews:
        return_reviews.append(review.to_dict())
    return jsonify(return_reviews)
    

@review_routes.route('/', methods=['POST'])
def create_review():
    """
    Creates an review.
    """
    form = ReviewForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            writer_id = form.data['writer_id'],
            application_id = form.data['application_id'],
            content = form.data['content'],
            score = form.data['score'],
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return 'invalid form'

