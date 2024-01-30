from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    img_url = db.Column(db.String)
    price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))

    store = db.relationship('Store', back_populates="items")

    serialize_rules =('-store.items', )

    @validates("name")
    def check_name(self, key, name):
        if not name:
            raise ValueError("Name must exist")
        elif len(name) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return name


def __repr__(self):
    return f'<Item {self.id} {self.name} >'