from .db import db
from flask_login import UserMixin
import datetime

class Response(db.Model, UserMixin):
  __tablename__ = 'responses'

  id = db.Column(db.Integer, primary_key = True)
  node_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  politic_id = db.Column(db.Integer, db.ForeignKey("politics.id"), nullable=False)
  answer = db.Column(db.String(1), default="N", nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  politic = db.relationship("Politic", back_populates="responses")
  node = db.relationship("User", back_populates="responses")

  def to_dict(self):
    return {
      "id": self.id,
      "node": self.node.to_dict(),
      "politic_id": self.politic_id,
      "answer": self.answer,
      "created_at": self.created_at
    }
