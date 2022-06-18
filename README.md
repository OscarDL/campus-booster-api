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

Config:
      ✔ Login: (4849ms)
    Models:
      Model Absence:
        ✔ Find all absence: (398ms)
        ✔ Find one absence: (406ms)
        ✔ Find by ID absence: (379ms)
        ✔ Count absence: (90ms)
      Model Balance:
        ✔ Find all balance: (92ms)
        ✔ Find one balance: (179ms)
        ✔ Find by ID balance: (181ms)
        ✔ Count balance: (89ms)
      Model Campus:
        ✔ Find all campus: (105ms)
        ✔ Find one campus: (179ms)
        ✔ Find by ID campus: (181ms)
        ✔ Count campus: (89ms)
      Model Classroom:
        ✔ Find all classroom: (247ms)
        ✔ Find one classroom: (199ms)
        ✔ Find by ID classroom: (192ms)
        ✔ Count classroom: (92ms)
      Model ClassroomHasCourse:
        ✔ Find all classroomhascourse: (100ms)
        ✔ Find one classroomhascourse: (185ms)
        ✔ Find by ID classroomhascourse: (91ms)
        ✔ Count classroomhascourse: (90ms)
      Model Contract:
        ✔ Find all contract: (112ms)
        ✔ Find one contract: (182ms)
        ✔ Find by ID contract: (90ms)
        ✔ Count contract: (90ms)
      Model Course:
        ✔ Find all course: (92ms)
        ✔ Find one course: (178ms)
        ✔ Find by ID course: (179ms)
        ✔ Count course: (90ms)
      Model Feedback:
        ✔ Find all feedback: (101ms)
        ✔ Find one feedback: (178ms)
        ✔ Find by ID feedback: (178ms)
        ✔ Count feedback: (88ms)
      Model Grade:
        ✔ Find all grade: (104ms)
        ✔ Find one grade: (180ms)
        ✔ Find by ID grade: (89ms)
        ✔ Count grade: (90ms)
      Model Planning:
        ✔ Find all planning: (93ms)
        ✔ Find one planning: (185ms)
        ✔ Find by ID planning: (185ms)
        ✔ Count planning: (90ms)
      Model Teacher:
        ✔ Find all teacher: (90ms)
        ✔ Find one teacher: (178ms)
        ✔ Find by ID teacher: (178ms)
        ✔ Count teacher: (89ms)
      Model Tool:
        ✔ Find all tool: (2293ms)
        ✔ Find one tool: (325ms)
        ✔ Find by ID tool: (404ms)
        ✔ Count tool: (89ms)
      Model User:
        ✔ Find all user: (195ms)
        ✔ Find one user: (179ms)
        ✔ Find by ID user: (179ms)
        ✔ Count user: (89ms)
      Model UserHasClassroom:
        ✔ Find all userhasclassroom: (93ms)
        ✔ Find one userhasclassroom: (182ms)
        ✔ Find by ID userhasclassroom: (90ms)
        ✔ Count userhasclassroom: (90ms)

  Services:
    Encryption with crypto:
      ✔ AES Encryption is working
      ✔ Encryption/Decryption
    Moderator service:
      ✔ Detect insult:
      ✔ Censor insult:
    AWS service:
      ✔ Upload file: (137ms)
      ✔ Download file: (138ms)
      ✔ Remove file: (78ms)
    Azure AD service:
      ✔ Get User list: (566ms)
      ✔ Get User by email: (107ms)
      ✔ Get User avatar by email: (94ms)
      ✔ Get Group list: (121ms)
      ✔ Get Group members from a group: (110ms)

## CONTACT:
Campus Booster [Admin](mailto:ulysse.dupont@supinfo.com?subject=[GitHub]%20Source%20Han%20Sans) \
<img src="https://www.supinfo.com/wp-content/uploads/2020/11/Capture-décran-2020-11-27-à-16.02.29.png" alt="Logo" width="100px"> \
Thanks you!
