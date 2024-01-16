from flask_restful import Resource
from flask import request, session
# from sqlalchemy.exc import IntegrityError, ValueError

from config import app, db, api
from models.models import User

class Signup(Resource):
  pass

api.add_resource(Signup, '/api/users')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
