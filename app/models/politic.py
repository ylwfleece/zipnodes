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
    return {
      "id": self.id,
      "nonprofit": self.nonprofit.to_dict(),
      "title": self.title,
      "description": self.description,
      "question": self.question,
      "end_time": self.end_time,
      "status": self.status,
      "updated_at": self.updated_at,
    }
