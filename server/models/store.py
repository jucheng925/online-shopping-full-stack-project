from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.sql import func

from config import db

class Store(db.Model, SerializerMixin):
    __tablename__ = "stores"
    id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String(20), nullable=False, unique=True)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())
    image = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    owner = db.relationship('User', back_populates='stores')

    serialize_rules = ('-user.stores',)

    @validates("store_name")
    def check_store_name(self, key, store_name):
        length = len(store_name)
        if not store_name:
            raise ValueError("Store name must exist")
        elif (length > 21):
            raise ValueError("Store name must no more than 20 characters long")
        return store_name

    def __repr__(self):
        return f'<Store {self.store_name}>'