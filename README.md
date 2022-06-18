<p align="center">
  <img src="https://user-images.githubusercontent.com/27915933/174158191-d209ecc6-7466-41aa-87e4-fcf60536dffe.png" alt="Logo" width="150px"/>
  <h1 align="center">Campus Booster</h1>
</p>

# Private API Campus Booster

Node.js typescript REST API

### Open the project

[Open API online](https://api.campusbooster.eu/)

### How to install?

Make sure you have Node.js on your device: [install node.js](https://nodejs.org/en/download) \
After Git clone,\
Go to project command line root\
#####USE NPM
```shell
npm install
```
### How to run?
#####USE NPM
```shell
npm start
```
If it's work you should see in logs
```shell
✅ Database is synchronized 
```
If not, please contact [Admin](mailto:ulysse.dupont@supinfo.com?subject=[GitHub]%20Source%20Han%20Sans)
### How to test?
Open a web REST client like [Postman](https://www.postman.com/downloads) \
And send request to [http://localhost:1337](http://localhost:1337) 
### Other scripts
#### Development
```shell
npm run start:dev
```
#### Build project
```shell
npm run build
```
#### Unit testing
```shell
npm run test
```
#### Prettier check
```shell
npm run format:check
```
#### Prettier fix
```shell
npm run format:fix
```

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

## AVAILABLE SERVICES:

<li>Config:
  <ul>✔ Login:</ul>
    <li>Models:</li>
      Model Absence:
        <ul>✔ Find all absence:</ul>
        <ul>✔ Find one absence:</ul>
        <ul>✔ Find by ID absence:</ul>
        <ul>✔ Count absence:</ul>
      Model Balance:
        <ul>✔ Find all balance:</ul>
        <ul>✔ Find one balance:</ul>
        <ul>✔ Find by ID balance:</ul>
        <ul>✔ Count balance:</ul>
      Model Campus:
        <ul>✔ Find all campus:</ul>
        <ul>✔ Find one campus:</ul>
        <ul>✔ Find by ID campus:</ul>
        <ul>✔ Count campus:</ul>
      Model Classroom:
        <ul>✔ Find all classroom:</ul>
        <ul>✔ Find one classroom:</ul>
        <ul>✔ Find by ID classroom:</ul>
        <ul>✔ Count classroom:</ul>
      Model ClassroomHasCourse:
        <ul>✔ Find all classroomhascourse:</ul>
        <ul>✔ Find one classroomhascourse:</ul>
        <ul>✔ Find by ID classroomhascourse:</ul>
        <ul>✔ Count classroomhascourse:</ul>
      Model Contract:
        <ul>✔ Find all contract:</ul>
        <ul>✔ Find one contract:</ul>
        <ul>✔ Find by ID contract:</ul>
        <ul>✔ Count contract:</ul>
      Model Course:
        <ul>✔ Find all course:</ul>
        <ul>✔ Find one course:</ul>
        <ul>✔ Find by ID course:</ul>
        <ul>✔ Count course:</ul>
      Model Feedback:
        <ul>✔ Find all feedback:</ul>
        <ul>✔ Find one feedback:</ul>
        <ul>✔ Find by ID feedback:</ul>
        <ul>✔ Count feedback:</ul>
      Model Grade:
        <ul>✔ Find all grade:</ul>
        <ul>✔ Find one grade:</ul>
        <ul>✔ Find by ID grade:</ul>
        <ul>✔ Count grade:</ul>
      Model Planning:
        <ul>✔ Find all planning:</ul>
        <ul>✔ Find one planning:</ul>
        <ul>✔ Find by ID planning:</ul>
        <ul>✔ Count planning:</ul>
      Model Teacher:
        <ul>✔ Find all teacher:</ul>
        <ul>✔ Find one teacher:</ul>
        <ul>✔ Find by ID teacher:</ul>
        <ul>✔ Count teacher:</ul>
      Model Tool:
        <ul>✔ Find all tool:</ul>
        <ul>✔ Find one tool:</ul>
        <ul>✔ Find by ID tool:</ul>
        <ul>✔ Count tool:</ul>
      Model User:
        <ul>✔ Find all user:</ul>
        <ul>✔ Find one user:</ul>
        <ul>✔ Find by ID user:</ul>
        <ul>✔ Count user:</ul>
      Model UserHasClassroom:
        <ul>✔ Find all userhasclassroom:</ul>
        <ul>✔ Find one userhasclassroom:</ul>
        <ul>✔ Find by ID userhasclassroom:</ul>
        <ul>✔ Count userhasclassroom:</ul>

  <li>Services:</li>
    Encryption with crypto:
       <ul>✔ AES Encryption is working</ul>
       <ul>✔ Encryption/Decryption</ul>
    Moderator service:
       <ul>✔ Detect insult:</ul>
       <ul>✔ Censor insult:</ul>
    AWS service:
       <ul>✔ Upload file:</ul>
       <ul>✔ Download file:</ul>
       <ul>✔ Remove file:</ul>
    Azure AD service:
       <ul>✔ Get User list:</ul>
       <ul>✔ Get User by email:</ul>
       <ul>✔ Get User avatar by email:</ul>
       <ul>✔ Get Group list:</ul>
       <ul>✔ Get Group members from a group:</ul>
</li>

## CONTACT:
Campus Booster [Admin](mailto:ulysse.dupont@supinfo.com?subject=[GitHub]%20Source%20Han%20Sans) \
<img src="https://www.supinfo.com/wp-content/uploads/2020/11/Capture-décran-2020-11-27-à-16.02.29.png" alt="Logo" width="100px"> \
Thanks you!
