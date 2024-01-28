from config import app, db

from faker import Faker

from models.models import User, Store

if __name__ == "__main__":
	with app.app_context():
		
		print("Deleting all records ...")
		User.query.delete()
		Store.query.delete()


		print("Creating users...")

		bob = User(username="bob", isAdmin=True)
		bob.password_hash = "test"

		susan = User(username ="susan", isAdmin=True)
		susan.password_hash="test"

		kim = User(username="kim", isAdmin=False)
		kim.password_hash="test"

		tom=User(username="tom", isAdmin=False)
		tom.password_hash ="test"
		
		users = [bob, susan, kim, tom]

		db.session.add_all(users)
		
		db.session.commit()

		print("Creating stores ...")

		flower_shop = Store(store_name="Flower Power", 
					  		description="This is a flower store that sell you flowers. Buy a beautiful floral arrangements for all your loved one.",
							user_id=susan.id)
		
		video_shop = Store(store_name="Games and more games",
					 		description="From old school games to the newest game out there, we have a large collection. Check us out.",
							user_id=bob.id)
		

		db.session.add(flower_shop)
		db.session.add(video_shop)
		db.session.commit()



