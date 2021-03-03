from .db import db
from flask_login import UserMixin
import datetime

class Order(db.Model, UserMixin):
  __tablename__ = 'orders'

  id = db.Column(db.Integer, primary_key = True)
  nonprofit_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(40), nullable = False)
  description = db.Column(db.String(255), nullable = False)
  location = db.Column(db.String(255), nullable = False)
  start_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  duration = db.Column(db.Integer, nullable = False, default=0)
  karma = db.Column(db.Integer, nullable = False, default=0)
  virtual = db.Column(db.Boolean, nullable = False)
  status = db.Column(db.String(10), nullable = False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  nonprofit = db.relationship("User", back_populates="orders")


  def to_dict(self):
    return {
      "id": self.id,
      "nonprofit_id": self.nonprofit_id,
      "title": self.title,
      "description": self.description,
      "location": self.location,
      "start_time": self.start_time,
      "duration": self.duration,
      "karma": self.karma,
      "virtual": self.virtual,
      "status": self.status,
      "updated_at": self.updated_at
    }
