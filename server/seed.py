from config import app, db

from faker import Faker

from models.models import User

if __name__ == "__main__":
	with app.app_context():
		
		print("Deleting all records ...")
		User.query.delete()

		fake = Faker()

		print("Creating users...")

		users = []
		usernames = []

		for i in range(10):
			username = fake.first_name()
			while username in usernames:
				username = fake.first_name()
			usernames.append(username)
			
			user = User(
				username=username,
				isAdmin = fake.boolean()
			)

			user.password_hash = user.username + 'password'

			users.append(user)
			
		db.session.add_all(users)
		
		db.session.commit()

