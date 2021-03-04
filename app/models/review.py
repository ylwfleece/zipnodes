from .db import db
from flask_login import UserMixin
import datetime

class Review(db.Model, UserMixin):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key = True)
  application_id = db.Column(db.Integer, db.ForeignKey("applications.id"), nullable=False)
  writer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  content = db.Column(db.String(225), nullable=False)
  score = db.Column(db.Integer, nullable = False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  application = db.relationship("Application", back_populates="review")


  def to_dict(self):
    return {
      "id": self.id,
      "writer_id": self.writer_id,
      "application_id": self.application_id,
      "content": self.content,
      "score": self.score,
      "updated_at": self.updated_at,
    }
