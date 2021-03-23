from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Project


class ProjectForm(FlaskForm):
    nonprofit_id = IntegerField('nonprofit_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    karma_per_share = IntegerField('karma_per_share', validators=[DataRequired()])
    cost_per_share = FloatField('cost_per_share', validators=[DataRequired()])
    total_shares = IntegerField('total_shares', validators=[DataRequired()])
    end_time = StringField('end_time', validators=[DataRequired()])



