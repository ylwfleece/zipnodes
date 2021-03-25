from .db import db
from flask_login import UserMixin
import datetime

class Politic(db.Model, UserMixin):
  __tablename__ = 'politics'

  id = db.Column(db.Integer, primary_key = True)
  nonprofit_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable = False)
  description = db.Column(db.String(455), nullable = False)
  question = db.Column(db.String(200), nullable = False)
  end_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  status = db.Column(db.String(35), nullable = False, default="Open")
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  nonprofit = db.relationship("User", back_populates="politics")
  responses = db.relationship("Response", back_populates="politic")

  def to_dict(self):
    responses_arr = []
    yays = 0
    nays = 0
    for response in self.responses:
      responses_arr.append(response.to_dict())
      if response.answer == 'Y':
        yays += 1
      else:
        nays += 1
    return {
      "id": self.id,
      "nonprofit": self.nonprofit.to_dict(),
      "title": self.title,
      "description": self.description,
      "question": self.question,
      "end_time": self.end_time,
      "status": self.status,
      "updated_at": self.updated_at,
      "responses": responses_arr,
      "yays": yays,
      "nays": nays
    }
