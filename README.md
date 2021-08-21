# Assignment 14

### Implement Oauth using passport JS in previous loopback application as a Loopback 4 component. Create a login page in UI. Add username field to user table. Implement login feature and ensure non logged in user is not able to access any other page in UI and any of the other APIs. Push the code to the repo on github. Generate a PR for review.


<br />


## concepts/Libraries used

* Angular UI
* Tailwind css for styling
* ES6 concpets
* loopback for backend api
* postgres-sql as datasorce
* SOLID principles implemented
* jwt-authentication with ngx-cookie

## routes

### /login

![Alt text](./5.png?raw=true "Title")

### /users

![Alt text](./1.png?raw=true "Title")

### /customers

![Alt text](./2.png?raw=true "Title")

### /customers/:id/users

![Alt text](./3.png?raw=true "Title")

### /createcustomer /createuser

![Alt text](./4.png?raw=true "Title")

## How to run

server : 
* cd lb4-server
* npm start
<br />

client : 
* cd angular-client
* npm start

## Working

* go to http://localhost:4200/register and create a user
* now go to http://localhost:4200/login and login with the user created
* initially a newly created user will be assigned the role having key 1 (SUPER_ADMIN) but you can edit the roles and user info.
* a non logged in user will be redirect to the login page if he/she tries to acces the protected routes


<br />
<br />
<br />


