# **API GUIDE**

# Authentication and Authorization

## Signup

**Request**

```json
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

```json
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

## Get User

**Request**

```json
GET api/user
Accept: application/json
Content-Type: application/json

headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
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
  }
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

## Get User by userId

**Request**

```json
GET api/user/:userId
Accept: application/json
Content-Type: application/json

headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
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
  }
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

## User/Email Confirmation

**Request**

```json
PATCH api/user/confirm
Accept: application/json
Content-Type: application/json

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}
```

**Successful Response**

```json
HTTP 200 OK
Content-Type: application/json

{
  "msg": "Email confirmed!"
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

## Reset Password

Reset password has two routes - 
- First to send user the link to reset password.
- Second to update the user password.

**Request-**
To send the password reset link to the user.

```json
POST api/user/reset-password
Accept: application/json
Content-Type: application/json

{
    "email": "john.doe@gmail.com"
}
```

**Successful Response**

```json
HTTP 200 OK
Content-Type: application/json

{ 
  "msg": "Password reset email sent!" 
}
```

**Request-** To update user password

```json
PATCH api/user/reset-password
Accept: application/json
Content-Type: application/json

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE",
    "newPassword":"newPassword"
}
```

**Successful Response**

```json
HTTP 200 OK
Content-Type: application/json

{ 
  "msg": "Password changed successfully!" 
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

## Update User

**Request**
```json
PATCH api/user/:userId
Accept: application/json
Content-Type: application/json
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}

{
  "fields": "Updated field value"
}
```

**Successful Response**

```json
HTTP 201 OK
Content-Type: application/json
Updated Value will be returned
{
  "user": {
    "_id": "619d155d12c742eb54148799",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "confirmed": false,
    "createdAt": "2021-11-23T16:22:53.187Z",
    "updatedAt": "2021-11-23T16:22:53.187Z",
    "__v": 0
  }
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

## Delete User

**Request**
```json
DELETE api/user/:userId
Accept: application/json
Content-Type: application/json
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}
```

**Successful Response**

```json
HTTP 200 OK
Content-Type: application/json
Updated Value will be returned
{
  "msg": "User deleted successfully."
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


# Posts

## Get all Posts

**Request**

```json
GET api/posts
Accept: application/json
Content-Type: application/json
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}

```

**Successful Response**

```json
HTTP 201 OK
Content-Type: application/json

{
  "posts": [
    {
      "_id": "61a232b9689f0796a4a91f41",
      "title": "First Post",
      "description": "This is the first post.",
      "imageURL": "Image Url",
      "postedBy": "61a22c54c58e697583e4196a",
      "createdAt": "2021-11-27T13:29:29.558Z",
      "updatedAt": "2021-11-27T13:29:29.558Z",
      "__v": 0
    },
    {
      "_id": "61a23380689f0796a4a91f43",
      "title": "Second Post",
      "description": "This is the second post.",
      "imageURL": "Image Url",
      "postedBy": "61a22c54c58e697583e4196a",
      "createdAt": "2021-11-27T13:32:48.535Z",
      "updatedAt": "2021-11-27T13:32:48.535Z",
      "__v": 0
    }
  ]
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

## Get a Post

**Request**

```json
GET api/posts/:postId
Accept: application/json
Content-Type: application/json
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}

```

**Successful Response**

```json
HTTP 201 OK
Content-Type: application/json

{
  "post": {
    "_id": "61a232b9689f0796a4a91f41",
    "title": "First Post",
    "description": "This is the first post.",
    "imageURL": "Image Url",
    "postedBy": "61a22c54c58e697583e4196a",
    "createdAt": "2021-11-27T13:29:29.558Z",
    "updatedAt": "2021-11-27T13:29:29.558Z",
    "__v": 0
  }
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

## Create a Post

**Request**

```json
POST api/post/new
Accept: application/json
Content-Type: application/json
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}

{
    "title": "Post Title",
    "description": "Post Description",
    "imageURL": "Post Image URL"
}
```

**Successful Response**

```json
HTTP 201 OK
Content-Type: application/json

{
  "post": {
    "title": "Post Title",
    "description": "Post Description",
    "imageURL": "Post Image URL",
    "postedBy": "61a22c54c58e697583e4196a",
    "_id": "61a23380689f0796a4a91f43",
    "createdAt": "2021-11-27T13:32:48.535Z",
    "updatedAt": "2021-11-27T13:32:48.535Z",
    "__v": 0
  }
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

## Delete a Post

**Request**

```json
DELETE api/post/:postId
Accept: application/json
Content-Type: application/json
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}
```

**Successful Response**

```json
HTTP 200 OK
Content-Type: application/json

{
  "msg": "Post deleted successfully."
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

## Update a Post

**Request**

```json
PATCH api/post/:postId
Accept: application/json
Content-Type: application/json
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQxNTVkMTJjNzQyZWI1NDE0ODc5OSIsImlhdCI6MTYzNzY4NDYzMiwiZXhwIjoxNjQwMjc2NjMyfQ.3MoODHkKfYVQg__6G4rZ_QCzn2JEHnnPRYUQDmFLDkE"
}

{
  "fieldsToUpdate": "value"
}
```

**Successful Response**

```json
HTTP 200 OK
Content-Type: application/json

{
  "post": {
    "_id": "61a232b9689f0796a4a91f41",
    "title": "First Post",
    "description": "This is the first post.",
    "imageURL": "Image Url",
    "postedBy": "61a22c54c58e697583e4196a",
    "createdAt": "2021-11-27T13:29:29.558Z",
    "updatedAt": "2021-11-27T13:29:29.558Z",
    "__v": 0
  }
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