from flask_restful import Resource
from flask import request, session
# from sqlalchemy.exc import IntegrityError, ValueError

from config import app, db, api
from models.models import User

class Signup(Resource):
  def post(self):
    data = request.get_json()
    
    username = data.get('username')
    isAdmin = data.get('isAdmin')

    user = User(username=username, isAdmin=isAdmin)
    user.password_hash = data.get('password')

    db.session.add(user)
    db.session.commit()

    return user.to_dict(), 201


api.add_resource(Signup, '/users')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
