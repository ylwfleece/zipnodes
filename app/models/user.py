from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  nonprofit = db.Column(db.Boolean, nullable = False, default=False)
  username = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  zip_code = db.Column(db.String(40), nullable=False, default='1234')
  karma = db.Column(db.Integer, nullable = False, default=0)
  score = db.Column(db.Integer, nullable = False, default=0)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  orders = db.relationship("Order", back_populates="nonprofit", cascade="all, delete-orphan")
  applications = db.relationship("Application", back_populates="node", cascade="all, delete-orphan")

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
      "nonprofit": self.nonprofit,
      "username": self.username,
      "email": self.email,
      "zip_code": self.zip_code,
      "karma": self.karma,
      "score": self.score
    }
