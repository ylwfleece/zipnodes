from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review


class ReviewForm(FlaskForm):
    writer_id = IntegerField('writer_id', validators=[DataRequired()])
    reviewee_id = IntegerField('reviewee_id', validators=[DataRequired()])
    application_id = IntegerField('application_id', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    score = IntegerField('score', validators=[DataRequired()])
        



