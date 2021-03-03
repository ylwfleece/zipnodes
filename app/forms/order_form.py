from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Order


class OrderForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    nonprofit = StringField('nonprofit', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired()])

