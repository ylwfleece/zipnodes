from .db import db
from flask_login import UserMixin
import datetime

class Application(db.Model, UserMixin):
  __tablename__ = 'applications'

  id = db.Column(db.Integer, primary_key = True)
  node_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
  status = db.Column(db.String(20), nullable = False, default="Pending")
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  order = db.relationship("Order", back_populates="applications")
  node = db.relationship("User", back_populates="applications")
  review = db.relationship("Review", back_populates="application")

  def to_dict(self):
    return {
      "id": self.id,
      "node_id": self.node_id,
      "order_id": self.order_id,
      "status": self.status,
      "updated_at": self.updated_at,
      "nonprofit_id": self.order.nonprofit_id,
      "order_title": self.order.title,
      "order_start_time": self.order.start_time,
      "node": self.node.to_dict()
    }
