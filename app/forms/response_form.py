from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Response


class ResponseForm(FlaskForm):
    node_id = IntegerField('node_id', validators=[DataRequired()])
    politic_id = IntegerField('politic_id', validators=[DataRequired()])
    answer = StringField('answer', validators=[DataRequired()])
    



