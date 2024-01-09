# Project Name Here
Fill out your project details here in your README.md


To run the react server:
npm run dev 


Note on the proxy in client/vite.config.js
You will need to add /api in front of all the fetch requests in order for the proxy to kick in, which is needed for authentication (cookies to be transmitted).

If your backend prefixes /api to all of your routes, for example: http://localhost:5555/api/check_session and you have api.add_resource(CheckSession, "/api/check_session"), you can remove the rewrite line which removes the /api from the route so you can use /api in your backend routes.