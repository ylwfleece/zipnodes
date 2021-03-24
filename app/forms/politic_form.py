from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Politic


class PoliticForm(FlaskForm):
    nonprofit_id = IntegerField('nonprofit_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    question = StringField('question', validators=[DataRequired()])
    end_time = StringField('end_time', validators=[DataRequired()])



