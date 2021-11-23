# Socially

Frontend Deployed Link:

Backend Deployed Link: [here](https://socially-webapp.herokuapp.com)

## Introduction

Some description about socially.

## Installation Guide

- Clone this repository [here](https://github.com/Ajinkya2000/socially_backend.git).
- The main branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default MongoDB Atlas or use your locally installed MongoDB.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

# API Guide

## Signup

**Request**

``` json
POST /user/signup
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