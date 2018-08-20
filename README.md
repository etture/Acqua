[한국어 버전](./README_kr.md)

RESTful API for *acqua* 
Server written in Node.js

## API Endpoints

- [Authentication](#authentication)
    - [x] [/api/auth/signup](#apiauthsignup)
    - [x] [/api/auth/signin](#apiauthsignin)  
- [User Entries](#user-entries)
    - [x] [/api/entries/get/:friend_id](#apientriesgetfriend_id)
    - [x] [/api/entries/post/:friend_id](#apientriespostfriend_id)
- [Friends List](#friends-list)
    - [x] [/api/friends/get](#apifriendsget)
    - [x] [/api/friends/add](#apifriendsadd)
- {User Profile](#user-profile)
    - [ ] [/api/profiles/basic](#apiprofilesbasic)
    - [ ] [/api/profiles/basic/update](#apiprofilesbasicupdate)
    - [ ] [/api/profiles/profile/:user_id](#apiprofilesprofileuser_id)
    - [ ] [/api/profiles/profile/update](#apiprofilesprofileupdate)
    - [ ] [/api/profiles/work/:user_id](#apiprofilesworkuser_id)
    - [ ] [/api/profiles/work/update](#apiprofilesworkupdate)

## API Description
### Authentication
#### /api/auth/signup
- HTTP method: `POST`
- Endpoint for a user to sign up
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
            "email": "apitest@gmail.com",
            "first_name": "Jordan",
            "last_name": "Belfort",
            "phone_number": "01049182881"
            }
	"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE0LCJpYXQiOjE1MzQ3NTI3MTAzMzF9.ZYo5qXNkGJ7l1rvCaKIYLknkUJNa3YjXT87Do-PyQZI"
	}
    ```
      
#### /api/auth/signin
- HTTP method: `POST`
- Endpoint for a user to sign in
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
### User Entries
#### /api/entries/get/:friend_id
- HTTP method: `GET`
- Return the list of entries written by user about other friends
- User identified by JWT token provided in the header
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
    ]
    ```

#### /api/entries/post/:friend_id
- HTTP method: `POST`

### Friends List
#### /api/friends/get
- HTTP method: `GET`

#### /api/friends/add
- HTTP method: `POST'

### User Profile
#### /api/profiles/basic
- HTTP method: `GET`

#### /api/profiles/basic/update
- HTTP method: `POST`

#### /api/profiles/profile/:user_id
- HTTP method: `GET`

#### /api/profiles/profile/update
- HTTP method: `POST`

#### /api/profiles/work/:user_id
- HTTP method: `GET`

#### /api/profiles/work/update
- HTTP method: `POST`