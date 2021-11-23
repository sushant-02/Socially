# Socially

Frontend Deployed Link:

Backend Deployed Link: [here](https://socially-webapp.herokuapp.com)

# Introduction

Some description about socially.

# Installation Guide

- Clone this repository [here](https://github.com/Ajinkya2000/socially_backend.git).
- The main branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default MongoDB Atlas or use your locally installed MongoDB.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

# API Guide

## Signup

**Request**

``` json
POST api/user/signup
Accept: application/json
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

**Successful Response**

An email is also sent to the user for confirmation.

```json
HTTP 200 OK
Content-Type: application/json

{
   "msg": "User created successfully."
}
```

**Failed Response**
```json
HTTP 400 Bad Request / 500 Internal Server Error

{
    "errors": {
        "msg": "An error message to show to client",
        "serverMsg": "This is an optional response, received only when 500 error occurs."
    }
}
```

## Signin

**Request**

``` json
POST api/user/signin
Accept: application/json
Content-Type: application/json

{
    "email": "john.doe@gmail.com",
    "password": "password"
}
```

**Successful Response**


```json
HTTP 200 OK
Content-Type: application/json

{
  "user": {
    "_id": "619d155d12c742eb54148799",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "confirmed": false,
    "createdAt": "2021-11-23T16:22:53.187Z",
    "updatedAt": "2021-11-23T16:22:53.187Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}
```

**Failed Response**
```json
HTTP 401 Unauthorized / 500 Internal Server Error

{
    "errors": {
        "msg": "An error message to show to client",
        "serverMsg": "This is an optional response, received only when 500 error occurs."
    }
}
```