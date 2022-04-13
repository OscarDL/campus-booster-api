# Private API Campus Booster

<img src="https://www.supinfo.com/wp-content/uploads/2020/11/Capture-décran-2020-11-27-à-16.02.29.png" alt="Logo" width="200px">
Node.js typescript REST API

### Open the project

[open API online](https://campusbooster.herokuapp.com/)

### How to install?

Make sure you have Node.js on your device: [install node.js](https://nodejs.org/en/download) \
After Git clone,\
Go to project command line root\
Execute :
```shell
npm install
```
### How to run?
After installation,
Execute :
```shell
npm test
```
If it's work you should see in logs
```shell
Database is synchronized
```
If not, please contact [Admin](mailto:ulysse.dupont@supinfo.com?subject=[GitHub]%20Source%20Han%20Sans)
### How to test?
Open a web REST client like [Postman](https://www.postman.com/downloads) \
And send request to [http://localhost:1337](http://localhost:1337) 

# DOCUMENTATION

Library HTTP server : [Express](https://www.npmjs.com/package/express) \
The API is RESTFULL, that means you can request it with methods (GET, POST, PATCH, DELETE, etc...) \
in order to communcate with our private services.


The API use a Bearer token with JSON Web Token (JWT) for authentificate.
Your sesssion will be active 1 month without renewal. \
Some examples of requests:

## Authentification 

Request:

```json

"path": "/auth"
"method": "POST",
"query": null
"header": 
{
  "API_KEY": ""
}
"body": 
{
  "email": "your.email@domain.com",
  "password": "your-password"
}

```

Response:

```json

{
  "accessToken": "your_access_token",
  "refreshToken": "your_refresh_token",
  "user": {...}
}

```


## DATABASE SCHEMA:

![MLD]()

## AVAILABLE SERVICES:

<ul>
</ul>


## CONTACT:
Campus Booster [Admin](mailto:ulysse.dupont@supinfo.com?subject=[GitHub]%20Source%20Han%20Sans) \
<img src="https://www.supinfo.com/wp-content/uploads/2020/11/Capture-décran-2020-11-27-à-16.02.29.png" alt="Logo" width="100px"> \
Thanks you!
