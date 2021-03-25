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
  reviews = db.relationship("Review", back_populates="writer", cascade="all, delete-orphan")
  projects = db.relationship("Project", back_populates="nonprofit", cascade="all, delete-orphan")
  purchases = db.relationship("Purchase", back_populates="node", cascade="all, delete-orphan")
  politics = db.relationship("Politic", back_populates="nonprofit", cascade="all, delete-orphan")
  responses = db.relationship("Response", back_populates="node", cascade="all, delete-orphan")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    purchase_karma = 0
    response_karma = 0
    purchase_ids = []
    response_ids = []
    project_ids = []
    politic_ids = []
    # for node
    if not self.nonprofit:
      # calculate karma from purchases and responses and construct purchase/response id arrays
      for purchase in self.purchases:
        purchase_karma += (purchase.num_shares * purchase.project.millikarma_per_share / 1000)
        purchase_ids.append(purchase.id)
      for response in self.responses:
        response_karma += 1
        response_ids.append(response.id)
    # for nonprofit
    else:
      # get all purchases for projects 
      for project in self.projects:
        project_ids.append(project.id)
      for politic in self.politics:
        politic_ids.append(politic.id)   
    return {
      "id": self.id,
      "nonprofit": self.nonprofit,
      "username": self.username,
      "email": self.email,
      "zip_code": self.zip_code,
      "karma": self.karma,
      "score": self.score,
      "purchase_karma": purchase_karma,
      "response_karma": response_karma,
      "purchase_ids": purchase_ids,
      "response_ids": response_ids,
      "project_ids": project_ids,
      "politic_ids": politic_ids,
    }
