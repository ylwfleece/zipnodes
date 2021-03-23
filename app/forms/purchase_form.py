from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Purchase


class PurchaseForm(FlaskForm):
    node_id = IntegerField('node_id', validators=[DataRequired()])
    project_id = IntegerField('project_id', validators=[DataRequired()])
    num_shares = IntegerField('num_shares', validators=[DataRequired()])
    



