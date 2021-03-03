from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class Node(db.Model, UserMixin):
  __tablename__ = 'nodes'

  id = db.Column(db.Integer, primary_key = True)
  full_name = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  zip_code = db.Column(db.String(40), nullable = False)
  karma = db.Column(db.Integer, nullable = False)
  score = db.Column(db.Integer, nullable = False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "full_name": self.full_name,
      "email": self.email,
      "zip_code": self.zip_code,
      "karma": self.karma,
      "score": self.score
    }
