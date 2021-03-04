from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Application


class ApplicationForm(FlaskForm):
    node_id = IntegerField('nonprofit_id', validators=[DataRequired()])
    order_id = IntegerField('order_id', validators=[DataRequired()])
    



