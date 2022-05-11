<img src="https://www.supinfo.com/wp-content/uploads/2020/11/Capture-décran-2020-11-27-à-16.02.29.png" alt="Logo" width="200px">

# Private API Campus Booster

Node.js typescript REST API

### Open the project

[open API online](https://campusbooster.herokuapp.com/)

### How to install?

Make sure you have Node.js on your device: [install node.js](https://nodejs.org/en/download) \
After Git clone,\
Go to project command line root\
#####USE NPM
```shell
npm install
```
#####USE PNPM
```shell
#you have pnpm
pnpm install
#you don't
npm run migration
```
### How to run?
#####USE NPM
```shell
npm start
```
#####USE PNPM
```shell
pnpm strart
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
"path": "/api/v1/auth/login"
"method": "POST",
"query": null
"body": 
{
  "azureId": "<YOUR_AZURE_USER_ID>"
}
```

Response:

```json
"cookies": {
  "accessToken": "<ACCESS_TOKEN>"
}
"data": {
  "refreshToken": "<REFRESH_TOKEN>",
  "user": {...}
}
```


## DATABASE SCHEMA:

![MLD]('https://campusboosterbucket.s3.eu-west-3.amazonaws.com/assets/MLD.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCWV1LXdlc3QtMiJHMEUCIEsqpTH1UgfwuS0u0UG9Xid%2BRciAUdsm9JOUun0EdLoaAiEAuyAr1S%2BvYUT1p3rkNda2pJ1rKoUQmN54R39sGb2o4GMq5AIIKhAAGgwyNzM0MzI3OTI0NTciDLEGFMMQtxO%2F8saD4yrBAi0OPOXAuJv%2Ffnnmd2OXtMh4pGr7tZwTcVpzJBaylC%2B1nukms8zrGhlmeGTetHnV1tb1PtUSzHd%2FvIDbR64bxiD37MQuPVs0yZytc%2BRmIYhtcoRF2XNJWI56OboHrl8P%2FqZpwxyuLcLF61E4cEMmQ11mmjwNdEBHR1uA%2BpuCMXHP2tfCMocSGIymdgKCUtH3nE80Hi2JR3gNx%2FArD2AelRHANOGn662tIURdNlwDr9ITBsb7ZlNfy2xEJmuxP5ie2uKVeKwZMVj%2BCr3Ly%2FtCF5cC8PG4zpsRZwqDzLA%2BZUWqb6DLeiJUE56PyA6DBAwtPd7gQxE1H0LDq%2FOlFwqMB2AYoc9KJfbI6zfsLscctoF6TRn%2BVqFBQDrSpyY7V8kkKLi5ZrIZvf2L2Xxigw300nklukNO%2F8T2B%2Fb25lU60PYyUjCE6%2B2TBjqzAiHXQHvVSm%2FnBA6uQFMnfwWQnDqVqFhk4I9CS8qJBNxFeAgeyXOXXMwK%2BT63wW91Z12OXuSDRKR5wIrvMB1xCKxiulYkEjw4cTahZRn9AGkAUPfTfNJXCvoDz3Iz3sud%2BF%2BCVb739i1rEqy%2FRXdwzmGmvM5ou%2BFnYIVr6f89bcl1SdU7fbRPVRCicUT%2B602b8KohUMQ0yinY8Evn4BW%2FrfvNy2D4b1d09oGEHbHZ2UAmnm6CTRDZ2gYJ27l3Potz1wP1Us3VchRqVd7j5vutxychgKxFJ%2Ba5MaiZab3MS%2FgvyBhuUgwj9LadN3a4BaVLylqCJiz82hU0q0K2cXbs255Xse9rArNL8%2Fos6yKhakuhsyv1GfocGikLdIdH9dpMgv%2Bnz%2B5OkomFfCpRoCFIQwxXhyA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220511T084904Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAT7KO5JWEUWSMDEWJ%2F20220511%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Signature=56b464dd84bb6ea01f053893e4fdefb4271d1ffbcf93e35fe6b994d15225840a')

## AVAILABLE SERVICES:

<ul>
</ul>


## CONTACT:
Campus Booster [Admin](mailto:ulysse.dupont@supinfo.com?subject=[GitHub]%20Source%20Han%20Sans) \
<img src="https://www.supinfo.com/wp-content/uploads/2020/11/Capture-décran-2020-11-27-à-16.02.29.png" alt="Logo" width="100px"> \
Thanks you!
