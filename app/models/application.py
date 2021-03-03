from .db import db
from flask_login import UserMixin
import datetime

class Application(db.Model, UserMixin):
  __tablename__ = 'applications'

  id = db.Column(db.Integer, primary_key = True)
  node_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
  status = db.Column(db.String(10), nullable = False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  order = db.relationship("Order", back_populates="applications")
  node = db.relationship("User", back_populates="applications")


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
