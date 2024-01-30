from config import app, db

from faker import Faker

from models.models import User, Store, Item

if __name__ == "__main__":
	with app.app_context():
		
		print("Deleting all records ...")
		Item.query.delete()
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
							img_url="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							user_id=susan.id)
		
		video_shop = Store(store_name="Games and more games",
					 		description="From old school games to the newest game out there, we have a large collection. Check us out.",
							img_url="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							user_id=bob.id)
		

		db.session.add(flower_shop)
		db.session.add(video_shop)
		db.session.commit()

		print("Creating items ....")

		pink_rose = Item(name="Pink Rose",
				   		description="Pink is the color of love. These pretty roses will bring happiness and love to whoever receives it.",
						img_url="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						price=40,
						quantity=10,
						store_id = flower_shop.id)
		
		rainbow_rose = Item(name="Rainbow Rose",
					  		description="Limited edition, Unique colored roses. For every occassion.",
							img_url="https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							price=100,
							quantity=3,
							store_id = flower_shop.id)
		
		board_game = Item(name="Trouble Board Game",
						description = "A classic family game. A must-have to add to your collection of board games",
						img_url="https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						price= 30,
						quantity=5,
						store_id = video_shop.id)
		
		xbox_controller = Item(name="X box controller",
						 description ="A must-have when playing your x-box",
						 img_url = "https://images.unsplash.com/photo-1603985753826-30c036e8804d?q=80&w=2986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						 price=70,
						 quantity=20,
						 store_id = video_shop.id)
		
		gameboy = Item(name="GameBoy",
				 	description ="Gameboy classic edition. You can have fun just like the 90s",
					img_url ="https://images.unsplash.com/photo-1631896928992-90e5a2cc7a4e?q=80&w=3661&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					price = 100,
					quantity=6,
					store_id = video_shop.id)
		
		db.session.add_all([pink_rose, rainbow_rose, board_game, xbox_controller, gameboy])
		db.session.commit()