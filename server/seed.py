from config import app, db

from faker import Faker

from models.models import User, Store

if __name__ == "__main__":
	with app.app_context():
		
		print("Deleting all records ...")
		Store.query.delete()
		User.query.delete()


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
							image="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							user_id=susan.id)
		
		video_shop = Store(store_name="Games and more games",
					 		description="From old school games to the newest game out there, we have a large collection. Check us out.",
							image="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							user_id=bob.id)
		

		db.session.add(flower_shop)
		db.session.add(video_shop)
		db.session.commit()



