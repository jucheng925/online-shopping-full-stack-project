from flask_restful import Resource
from flask import request, session, render_template
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models.models import User, Store, Item, Purchase

class Signup(Resource):
  def post(self):
    try:
        data = request.get_json()
        
        username = data.get('username')
        isAdmin = data.get('isAdmin')

        user = User(username=username, isAdmin=isAdmin)
        user.password_hash = data.get('password')

        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id

        return user.to_dict(rules=('-stores', '-purchases')), 201
    
    except IntegrityError:
       return {"error": "Username already exist"}, 422
    except ValueError as err:
       return {"error" : str(err)}, 422
       
    
class CheckSession(Resource):
   def get(self):
      user = User.query.filter(User.id == session.get('user_id')).first()
      if user:
         return user.to_dict(rules=('-stores', '-purchases')), 200
      else:
         return {"message" : "Not Authorized"}, 401

class Login(Resource):
   def post(self):
      data = request.get_json()
      username = data.get("username")
      password = data.get("password")
      user = User.query.filter(User.username == username).first()
      if user and user.authenticate(password):
         session["user_id"] = user.id
         return user.to_dict(rules=('-stores', '-purchases')), 200
      else:
         return {"errors": "Incorrect username or password"}, 422
      
class Logout(Resource):
   def delete(self):
      session["user_id"] = None
      return {"message": "Log out"}, 204
   
class StoreList(Resource):
   def get(self):
      user = User.query.filter(User.id == session.get('user_id')).first()
      if user:
         stores = Store.query.all()
         stores_dict = [store.to_dict(rules=('-owner', '-items')) for store in stores]
         return stores_dict, 200
      else:
         return {"message" : "Not Authorized"}, 401
      
   def post(self):
      try:
         data = request.get_json()
         store_name = data.get("store_name")
         description = data.get("description")
         img_url = data.get("img_url")
         user_id = session.get('user_id')

         new_store = Store(store_name=store_name, description=description, 
                           img_url=img_url, user_id=user_id)
         
         db.session.add(new_store)
         db.session.commit()

         return new_store.to_dict(rules=('-owner', '-items')), 201
      
      except IntegrityError:
         return {"error": "Store name already exist"}, 422
      
class StoreById(Resource):
   def get(self, storeid):
      store = Store.query.filter_by(id=storeid).first()
      if store:
         return store.to_dict(rules=('-owner', )), 200
      else:
         return {}, 404
   
   def delete(self, storeid):
      store = Store.query.filter_by(id=storeid).first()
      db.session.delete(store)
      db.session.commit()
      return {}, 204
   
   def patch(self, storeid):
      store = Store.query.filter_by(id=storeid).first()
      try:
         data = request.get_json()
         for attr in data:
            setattr(store, attr, data.get(attr))

         db.session.add(store)
         db.session.commit()
         return store.to_dict(rules=('-owner', )), 200
      
      except IntegrityError:
         return {"error": "Store name already exist"}, 422
      
class StoresByOwner(Resource):
   def get(self, userid):
      stores = Store.query.filter_by(user_id = userid).all()
      stores_dict = [store.to_dict() for store in stores]
      return stores_dict, 200

   
class Items(Resource):
   def get(self):
      user = User.query.filter(User.id == session.get('user_id')).first()
      if user:
         items = Item.query.all()
         items_dict = [item.to_dict(rules =('-store', )) for item in items]
         return items_dict, 200
      else: 
         return {"message" : "Not Authorized"}, 401
      
   def post(self):
      data = request.get_json()
      name = data.get("name")
      description = data.get("description")
      img_url = data.get("img_url")
      price = data.get("price")
      quantity = data.get("quantity")
      store_id = data.get("store_id")

      newItem = Item(name=name, description=description,
                     img_url=img_url, price=price,
                     quantity=quantity, store_id=store_id)
      
      db.session.add(newItem)
      db.session.commit()
      return newItem.to_dict(rules =('-store', )), 201

      
class ItembyId(Resource):
   def get(self, itemid):
      item = Item.query.filter_by(id=itemid).first()
      if item:
         return item.to_dict(rules =('-store', )), 200
      else:
         return {}, 404
      
   def delete(self, itemid):
      item = Item.query.filter_by(id=itemid).first()
      db.session.delete(item)
      db.session.commit()
      return {}, 204
   
   def patch(self, itemid):
      item = Item.query.filter_by(id=itemid).first()
      data = request.get_json()
      for attr in data:
            setattr(item, attr, data.get(attr))
      db.session.add(item)
      db.session.commit()
      return item.to_dict(rules =('-store', )), 200
   
class Purchases(Resource):
   def get(self):
      purchases = Purchase.query.all()
      purchases_dict = [purchase.to_dict() for purchase in purchases]
      return purchases_dict, 200
   
   def post(self):
      data = request.get_json()
      user_id = session.get('user_id')
      item_id = data.get("item_id")
      quantity = data.get("quantity")
      amt_spent = data.get("amt_spent")

      newPurchase = Purchase(user_id=user_id, item_id=item_id, quantity=quantity, amt_spent=amt_spent)
      db.session.add(newPurchase)
      db.session.commit()
      
      return newPurchase.to_dict(), 201


   
class PurchasesByUser(Resource):
   def get(self, userid):
      purchases = Purchase.query.filter_by(user_id = userid).all()
      purchases_dict = [purchase.to_dict(rules=('-user',)) for purchase in purchases]
      return purchases_dict, 200
   
class PurchasesByStore(Resource):
   def get(self, storeid):
      store = Store.query.filter_by(id = storeid).first()
      items = store.items
      purchases = []
      for item in items:
         purchases.extend(Purchase.query.filter_by(item_id = item.id).all())
      purchases_dict = [purchase.to_dict() for purchase in purchases]
      return purchases_dict, 200
   
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(StoreList, '/api/stores')
api.add_resource(StoreById, '/api/stores/<int:storeid>')
api.add_resource(StoresByOwner, '/api/stores/owner/<int:userid>')
api.add_resource(Items, '/api/items')
api.add_resource(ItembyId, '/api/items/<int:itemid>')
api.add_resource(PurchasesByStore, '/api/purchases/stores/<int:storeid>')
api.add_resource(Purchases, '/api/purchases')
api.add_resource(PurchasesByUser, '/api/purchases/<int:userid>')


@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

if __name__ == "__main__":
  app.run(port=5555, debug=True)
