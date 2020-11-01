# Outvio-BE

After pulling the repository, run the following:
  > NPM INSTALL
  
  > NPM START
  
The server will be listening to port 3000, API calls will be available on /users route, URL 127.0.0.1:3000/users.

User role can be changed in app.js under variable userRole, possible roles: [Standard, Premium, Elite].
All role specific rates can be found under app.js, under options denys/allows.

IP Whitelisting/Blacklisting can be done from accesscontrol.js.

# Description

*	Allow restricting access by user or by IP - [DONE]
*	Set rate limit per user/IP - [DONE]
*	Restriction should be 100/500/1000 requests per hour for an individual user - [DONE]
*	Those numbers should be configurable from the environment - [DONE]
*	When a user reaches the limit, in the response show an error message about current limit for that user account, and display when (time) the user can make the next request - [DONE]
*	Bonus: keep performance in mind.
*	Optional task: Create a different weight of request rate for every URL: 1/2/5 points per request (you can assume we have 5 different end points) depending on end point.

Used stack includes:
*	Node.js using Express.
*	MongoDB

Additional:
* dotenv - environment settings
* express-ip-access-control - IP whitelist/blacklist
* express-rate-limit - rate limiting (max request by IP)
* nodemon - active node server restarting
* body-parser - POST body parsing
