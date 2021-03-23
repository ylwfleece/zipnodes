from .db import db
from flask_login import UserMixin
import datetime

class Project(db.Model, UserMixin):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key = True)
  nonprofit_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable = False)
  description = db.Column(db.String(255), nullable = False)
  end_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  karma_per_share = db.Column(db.Integer, nullable = False, default=0)
  cost_per_share = db.Column(db.Float, nullable = False, default=0)
  total_shares = db.Column(db.Integer, nullable = False, default=0)
  status = db.Column(db.String(35), nullable = False, default="Open")
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  nonprofit = db.relationship("User", back_populates="projects")
#   purchases = db.relationship("Purchase", back_populates="project")

  def to_dict(self):

    return {
      "id": self.id,
      "nonprofit_id": self.nonprofit_id,
      "title": self.title,
      "description": self.description,
      "end_time": self.end_time,
      "karma_per_share": self.karma_per_share,
      "cost_per_share": self.cost_per_share,
      "total_shares": self.total_shares,
      "status": self.status,
      "updated_at": self.updated_at,
      # "purchases": self.purchases,
    }
