from config import app, db, Api
from models.user import User

if __name__ == "__main__":
  app.run(port=5555, debug=True)
