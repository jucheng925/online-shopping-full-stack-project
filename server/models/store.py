from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.sql import func

from config import db, bcrypt

class Store(db.Model, SerializerMixin):
    __tablename__ = "stores"
    id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String(15), nullable=False, unique=True)
    description = db.Column(db.Text)
    created_at = db.Column(db.Datetime, server_default=func.now())
    updated_at = db.Column(db.Datetime, onupdate=func.now())
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    owner = db.relationship('User', back_populates='stores')

    serialize_rules = ('-user.stores',)

    def __repr__(self):
        return f'<Store {self.store_name}>'