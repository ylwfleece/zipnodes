from .db import db
from flask_login import UserMixin
import datetime

class Purchase(db.Model, UserMixin):
  __tablename__ = 'purchases'

  id = db.Column(db.Integer, primary_key = True)
  node_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
  num_shares = db.Column(db.Integer, default=0, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  project = db.relationship("Project", back_populates="purchases")
  node = db.relationship("User", back_populates="purchases")

  def to_dict(self):
    return {
      "id": self.id,
      "node": self.node.to_dict(),
      "project": self.project.to_dict(),
      "num_shares": self.num_shares,
      "created_at": self.created_at
    }
