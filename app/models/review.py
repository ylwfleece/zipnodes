from .db import db
from flask_login import UserMixin
import datetime

class Review(db.Model, UserMixin):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key = True)
  application_id = db.Column(db.Integer, db.ForeignKey("applications.id"), nullable=False)
  writer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  reviewee_id = db.Column(db.Integer, nullable=False)
  content = db.Column(db.String(225), nullable=False)
  score = db.Column(db.Integer, nullable = False)
  response_id = db.Column(db.Integer, nullable = True, default=None)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  application = db.relationship("Application", back_populates="review")
  writer = db.relationship("User", back_populates="reviews")


  def to_dict(self):
    return {
      "id": self.id,
      "writer_id": self.writer_id,
      "reviewee_id": self.reviewee_id,
      "application_id": self.application_id,
      "content": self.content,
      "score": self.score,
      "karma": self.application.order.karma,
      "updated_at": self.updated_at,
      "nonprofit_id": self.application.order.nonprofit_id,
      "node_id": self.application.node_id,
      "order_title": self.application.order.title,
      "order_start_time": self.application.order.start_time,
      "response_id": self.response_id,
      "writer": self.writer.to_dict()
    }
