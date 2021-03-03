from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Order


class OrderForm(FlaskForm):
    nonprofit_id = IntegerField('nonprofit_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    start_time = StringField('start_time', validators=[DataRequired()])
    duration = IntegerField('duration', validators=[DataRequired()])
    karma = IntegerField('duration', validators=[DataRequired()])
    virtual = StringField('virtual', validators=[DataRequired()])



