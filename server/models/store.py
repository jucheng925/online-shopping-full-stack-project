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
    img_url = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    owner = db.relationship('User', back_populates='stores')
    items = db.relationship('Item', back_populates='store', cascade='all, delete-orphan')

    serialize_rules = ('-owner.stores', '-items.store')

    @validates("store_name")
    def check_store_name(self, key, store_name):
        length = len(store_name)
        if not store_name:
            raise ValueError("Store name must exist")
        elif (length > 21):
            raise ValueError("Store name must no more than 20 characters long")
        return store_name

    def __repr__(self):
        return f'<Store {self.id} {self.store_name}>'