from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func

from config import db

class Purchase(db.Model, SerializerMixin):
    __tablename__ = "purchases"
    id = db.Column(db.Integer, primary_key = True)
    amt_spent = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    user = db.relationship('User', back_populates ='purchases')
    item = db.relationship('Item', back_populates ='purchases')

    serialize_rules = ('-user.purchases', '-item.purchases')


    def __repr__(self):
        return f'<Purchase {self.id} item {self.item_id} purchase by {self.user_id}>'