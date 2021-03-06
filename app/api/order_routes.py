from flask import Blueprint, jsonify, session, request
from app.models import User, Order, db
from app.forms import OrderForm
from flask_login import current_user, login_user, logout_user, login_required

order_routes = Blueprint('orders', __name__)


@order_routes.route('/', methods=['GET'])
def get_orders():
    """
    Gets all orders.
    """
    orders = Order.query.all()
    return_orders = []
    for order in orders:
        return_orders.append(order.to_dict())
    return jsonify(return_orders)
    

@order_routes.route('/', methods=['POST'])
def create_order():
    """
    Creates an order.
    """
    form = OrderForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        virtual_bool = form.data['virtual'] == "True"
        order = Order(
            nonprofit_id = form.data['nonprofit_id'],
            title = form.data['title'],
            description = form.data['description'],
            location = form.data['location'],
            start_time = form.data['start_time'],
            duration = form.data['duration'],
            karma = form.data['karma'],
            virtual = virtual_bool
        )
        db.session.add(order)
        db.session.commit()
        return order.to_dict()
    return 'invalid form'


@order_routes.route('/update/<int:order_id>', methods=['GET'])
def update_order(order_id):
    """
    Updates an order.
    """
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    # new_status = request.data.decode('ascii')
    order = Order.query.filter(Order.id == order_id).first()
    if order.status == "Unfilled":
        order.status = "In Progress"
    elif order.status == "In Progress":
        order.status = "Complete"
    db.session.add(order)
    db.session.commit()
    return order.to_dict()

