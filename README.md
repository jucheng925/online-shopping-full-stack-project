# Onwards Online Shopping
An online marketplace allowing shoppers to purchase items listed by store owners. Both store owners and shoppers will need their own account to sign in before they are able to view the website content. Store owners will have the ability to add/edit/delete stores and their respective store items. Store owners will be able to view a tablet showcasing all the purchases that were made from their stores. Store items will keep track of how many times it was purchases. Shoppers will have the ability to look through all the available stores and can view items for each store. Shoppers are also able to view their prior purchases.

This is a full stack application utilizing React as the frontend and Flask-SQLalchemy as the backend.

## Models
This project has 4 models.
- User
- Store
- Item
- Purchase

The User model has a boolean attribute that will determine whether the instance of the user is an admin or non-Admin. As an admin, user has a one to many relationship with stores. For non-admin, user has a one to many relationship with purchases and through purchases, user has a many to many relationship with items.

A store has a one to many relationship with items.

An item has a one to many relationship with purchases

<img src ="phase-4 project.png"/>

## How to get started
Install the require packages (client-side):
```
cd client
npm install
```
Install the require packages (server-side):
```
cd server
pipenv install
```

To run the react server: `npm run dev` 
The default port that client side will run is on 5173

Check to see if you are in virtual environment. If not, enter the virtual environment by `pipenv shell`. To run the backend server: `python app.py` It will be running on 5555.

To prepopulate the database with seed data, run `python seed.py` in the server folder.

## Routes (backend)
All the backend routes are located in the app.py file.

| Routes     | Description |
|--------- | -------|
| /check_session | GET to check to see if an user is already log in |
| /signup | POST to create a new user|
| /login | POST to log in an user and assign the user id to the session |
| /logout | DELETE the user id from the session |
| /stores | GET all the stores |
| /stores | POST create a new store |
| /stores/\<int:storeid>| GET the store with this storeid |
| /stores/\<int:storeid>| DELETE the store with this storeid|
| /stores/\<int:storeid>| PATCH update the store with this storeid|
| /stores/owner/\<int:userid>| GET all the stores that is owned by this userid|
| /items | GET all the items |
| /items | POST creat a new item|
| /items/\<int:itemid> | GET the item with this itemid|
| /items/\<int:itemid> | DELETE the item with this itemid|
| /items/\<int:itemid> | PATCH update the item with this itemid|
| /purchases | GET all the purchases|
| /purchases | POST create a new purchase|
| /purchases/stores/\<int:storeid>| GET the purchases that belong to this storeid|
| /puchases/\<int:userid> | GET the purchases that belong to this userid |


## Future Plans
This project is currently functional in development server. Some minor issues need to fix when using production server. Once that is taken care of, this project can be deployed. Currently once a store or item is deleted, the corresponding purchase is also delete due to cascade. Will need to work on a way to disable that feature. Purchases history should still be available even when an item has been deleted from a store. Another future plan is to add Stripe or another payment API to handle payment transactions. Another feature I am thinking about is adding the ability to upload a picture instead of providing the urls (when creating a store or an item).
