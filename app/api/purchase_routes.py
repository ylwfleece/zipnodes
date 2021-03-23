from flask import Blueprint, jsonify, session, request
from app.models import User, Purchase, db
from app.forms import PurchaseForm
from flask_login import current_user, login_user, logout_user, login_required

purchase_routes = Blueprint('purchases', __name__)


@purchase_routes.route('/', methods=['GET'])
def get_purchases():
    """
    Gets all purchases.
    """
    purchases = Purchase.query.all()
    return_purchases = []
    for purchase in purchases:
        return_purchases.append(purchase.to_dict())
    return jsonify(return_purchases)
    

@purchase_routes.route('/', methods=['POST'])
def create_purchase():
    """
    Creates a purchase.
    """
    form = PurchaseForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        purchase = purchase(
            node_id = form.data['node_id'],
            project_id = form.data['project_id'],
            num_shares = form.data['num_shares']
        )
        db.session.add(purchase)
        db.session.commit()
        return purchase.to_dict()
    return 'invalid form'




