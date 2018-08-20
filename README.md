# acqua API

<img src="./public/images/logo_white.png" width="200">

[한국어 버전](./README_kr.md)

RESTful API for *acqua* 

Server written in Node.js

Deployed to Heroku, current URL: *https://acqua-api.herokuapp.com*

# API Endpoints

- [Authentication](#authentication)
    - [x] [/api/auth/signup](#apiauthsignup) `POST`
    - [x] [/api/auth/signin](#apiauthsignin)  `POST`
- [User Entries](#user-entries)
    - [x] [/api/entries/get/:friend_id](#apientriesgetfriend_id) `GET`
    - [x] [/api/entries/post/:friend_id](#apientriespostfriend_id) `POST`
- [Friends List](#friends-list)
    - [x] [/api/friends/get](#apifriendsget) `GET`
    - [x] [/api/friends/add](#apifriendsadd) `POST`
- [User Profile](#user-profile)
    - [x] [/api/profiles/basic](#apiprofilesbasic) `GET`
    - [ ] [/api/profiles/basic/update](#apiprofilesbasicupdate) `PUT`
    - [ ] [/api/profiles/basic/update_pw](#apiprofilesbasicupdate_pw) `PUT`
    - [ ] [/api/profiles/profile/:user_id](#apiprofilesprofileuser_id) `GET`
    - [ ] [/api/profiles/profile/update](#apiprofilesprofileupdate) `POST`
    - [ ] [/api/profiles/work/:user_id](#apiprofilesworkuser_id) `GET`
    - [ ] [/api/profiles/work/update](#apiprofilesworkupdate) `POST`

# API Description
## Authentication
### /api/auth/signup
- HTTP method: `POST`
- Endpoint for `user` to sign up
- On success, parameters are saved to the `users` table in the database and a JWT token is returned
- Request
    - Parameters
        ```js
        {
	    "email": "email address",
	    "password": "password",
	    "first_name": "first name",
	    "last_name": "last name",
	    "phone_number": "phone number"
	    }
        ```
- Response
    ```js
    {      
    "isSuccess": true,
	"user": {
            "id": 231
            "last_name": "Belfort",
            "first_name": "Jordan",
            "email": "apitest@gmail.com",          
            "phone_number": "01049182881"
            }
	"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE0LCJpYXQiOjE1MzQ3NTI3MTAzMzF9.ZYo5qXNkGJ7l1rvCaKIYLknkUJNa3YjXT87Do-PyQZI"
	}
    ```
      
### /api/auth/signin
- HTTP method: `POST`
- Endpoint for `user` to sign in
- On success, a JWT token is returned
- Request
    - Parameters
        ```js
        {
        "email": "email address",
        "password": "password"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE0LCJpYXQiOjE1MzQ3NTI3MTAzMzF9.ZYo5qXNkGJ7l1rvCaKIYLknkUJNa3YjXT87Do-PyQZI"
    }
    ```
## User Entries
### /api/entries/get/:friend_id
- HTTP method: `GET`
- Return a list of memo `entries` written by `user` about other `friends`
- `user` identified by JWT token provided in the header
- Request
    - Sample Dummy Request Info
        - `user_id`: 2
        - `friend_id`: 8
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response
    ```js
    [  
      {
      "id": 423,
      "user_id": 2,
      "friend_id": 8,
      "memo": "memo written by user 2 about user 8, blah blah...",
      "created_at": "2018-08-19T12:30:21.000Z",
      "last_modified": "2018-08-19T12:30:21.000Z"
      },
      {
      "id": 516,
      "user_id": 2,
      "friend_id": 8,
      "memo": "another memo written by user 2 about user 8, blah blah...",
      "created_at": "2018-08-20T06:32:17.000Z",
      "last_modified": "2018-08-20T06:32:17.000Z"
      },
      ...
    ]
    ```

### /api/entries/post/:friend_id
- HTTP method: `POST`
- Save a memo `entry` written by `user` about `friend` to the database
- Request
    - Sample Dummy Request Info
        - `user_id`: 2
        - `friend_id`: 8
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Parameters
        ```js
        {
        "memo": "memo about a friend"
        }
        ```
- Response
    ```js
    {  
    "isSuccess": true,
    "user_id": 2,
    "friend_id": 8,
    "post_id": 610
    }
    ```

## Friends List
### /api/friends/get
- HTTP method: `GET`
- Return a list of `user`'s `friends`
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response
    ```js
    [
      {  
      "friend_id": 7,
      "last_name": "Park",
      "first_name": "Mark",
      "email": "parkmark@gmail.com",
      "phone_number": "01099291028"
      },
      {
      "friend_id": 9,
      "last_name": "Jong",
      "first_name": "Soon",
      "email": "jongsoon@gmail.com",
      "phone_number": "01012345678"
      },
      ...
	]
    ```

### /api/friends/add
- HTTP method: `POST'
- Add a `friend` for `user`
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Parameters
        ```js
        {
        "friend_id": "friend_id"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "friend_id": 8    
    }
    ```

## User Profile
### /api/profiles/basic
- HTTP method: `GET`
- Return basic, private `profile` information about `user` 
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response
    ```js
    {
    "id": 231
    "last_name": "Belfort",
    "first_name": "Jordan",
    "email": "apitest@gmail.com",          
    "phone_number": "01049182881"  
    }
    ```

### /api/profiles/basic/update
- HTTP method: `PUT`
- Update `user`'s basic, private `profile` information, except for password
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response

### /api/profiles/basic/update_pw
- HTTP method: `PUT`
- Update `user`'s password
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response

### /api/profiles/profile/:user_id
- HTTP method: `GET`
- Return `user`'s public `profile` information
- Request
- Response

### /api/profiles/profile/update
- HTTP method: `POST`
- Update `user`'s public `profile` information
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response

### /api/profiles/work/:user_id
- HTTP method: `GET`
- Return `user`'s work history information
- Request
- Response

### /api/profiles/work/update
- HTTP method: `POST`
- Update `user`'s work history information
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response