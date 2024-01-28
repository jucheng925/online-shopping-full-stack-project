from flask_restful import Resource
from flask import request, session, render_template
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models.models import User, Store

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

        return user.to_dict(), 201
    
    #need to come back and fix
    except IntegrityError:
       return {"error": "Username already exist"}, 422
    except ValueError as err:
       return {"error" : str(err)}, 422
       
    
class CheckSession(Resource):
   def get(self):
      user = User.query.filter(User.id == session.get('user_id')).first()
      if user:
         return user.to_dict(), 200
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
         return user.to_dict(), 200
      else:
         return {"message", "Incorrect username or password"}, 422
      
class Logout(Resource):
   def delete(self):
      session["user_id"] = None
      return {"message": 'Log out'}, 204
   
class StoreList(Resource):
   def get(self):
      user = User.query.filter(User.id == session.get('user_id')).first()
      if user:
         if user.isAdmin == False:
            stores = Store.query.all()
            stores_dict = [store.to_dict() for store in stores]
            return stores_dict, 200
         else:
            stores = Store.query.filter(Store.user_id==user.id).all()
            stores_dict = [store.to_dict() for store in stores]
            return stores_dict, 200
      else:
            return {"message" : "Not Authorized"}, 401



api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(StoreList, '/api/storeslist')

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

if __name__ == "__main__":
  app.run(port=5555, debug=True)
