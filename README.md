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
    - [ ] [/api/entries/edit/:entry_id](#apientriesputentry_id) `PUT`    
- [Friends List](#friends-list)
    - [x] [/api/friends/get](#apifriendsget) `GET`
    - [x] [/api/friends/add](#apifriendsadd) `POST`
    - [x] [/api/friends/nickname](#apifriendsnickname) `PUT`
- [User Profile](#user-profile)
    - [ ] [/api/profiles/self](#apiprofilesself) `GET`
    - [ ] [/api/profiles/:user_id](#apiprofilesuser_id) `GET`
    - [x] [/api/profiles/basic/self](#apiprofilesbasicself) `GET`
    - [x] [/api/profiles/basic/:user_id](#apiprofilesbasicuser_id) `GET`
    - [x] [/api/profiles/basic/update](#apiprofilesbasicupdate) `PUT`
    - [x] [/api/profiles/basic/update_pw](#apiprofilesbasicupdate_pw) `PUT`
    - [ ] [/api/profiles/profile/self](#apiprofilesprofileself) `GET`
    - [x] [/api/profiles/profile/:user_id](#apiprofilesprofileuser_id) `GET`
    - [ ] [/api/profiles/profile/update](#apiprofilesprofileupdate) `PUT`
    - [ ] [/api/profiles/work/self](#apiprofilesworkself) `GET`
    - [ ] [/api/profiles/work/:user_id](#apiprofilesworkuser_id) `GET`
    - [ ] [/api/profiles/work/add](#apiprofilesworkadd) `POST`
    - [ ] [/api/profiles/work/update](#apiprofilesworkupdate) `PUT`

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

### /api/entries/edit/:entry_id
- HTTP method: `PUT`
- Edit `user`'s memo about `friend` using the `entry` id
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

### /api/friends/nickname
- HTTP method: `PUT`
- Edit `friend`'s nickname to be displayed to `user`
- Request
    - Sample Dummy Request Info
        - `friend_id`: 7
        - `nickname`: "Wolverine"
    - Header
        ```js
        {
        "authorization": "JWT token"    
        }
        ```
    - Parameters
        ```js
        {
        "friend_id": "friend_id",
        "nickname": "new nickname"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "friend_id": 7,
    "nickname": "Wolverine"     
    }
    ```

## User Profile
### /api/profiles/self
- HTTP method: `GET`
- Return all of own `user`'s profile information
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
    
    }
    ```

### /api/profiles/:user_id
- HTTP method: `GET`
- Return all of another `user`'s profile information
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
    
    }
    ```

### /api/profiles/basic/self
- HTTP method: `GET`
- Return basic, private `profile` information about own `user` 
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

### /api/profiles/basic/:user_id
- HTTP method: `GET`
- Return basic, private `profile` information about another `user` 
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
- Update own `user`'s basic, private `profile` information, except for password
- If a request parameter is an empty string, the item is not updated
- If a request parameter contains a string, the item is updated to that string
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
        "last_name": "updated item or empty string",
        "first_name": "updated item or empty string",
        "email": "updated item or empty string",
        "phone_number": "updated item or empty string"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "updatedItems": {  
               "last_name": "Kim",
               "first_name": "Chulsoo",
               "email": "chulsoo@gmail.com"
               "phone_number": "01012345678"
               }
    }
    ```

### /api/profiles/basic/update_pw
- HTTP method: `PUT`
- Update own `user`'s password
- Receive original password and new password as parameters
- If the original password matches, place the request; otherwise, an error occurs 
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
        "old_password": "original password",
        "new_password": "new password"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true
    }
    ```

### /api/profiles/profile/self
- HTTP method: `GET`
- Return own `user`'s public `profile` information
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
    "user_id": 13,
    "gender": "female",
    "birthday": null,
    "profile_picture": null,
    "high_school": "Centennial High School",
    "university_name": "Korea University",
    "university_major": "Computer Science",
    "graduate_masters_name": null,
    "graduate_masters_major": null,
    "graduate_phd_name": null,
    "graduate_phd_major": null,
    "current_work_name": "Google",
    "current_work_position": "Developer"
    }
    ```

### /api/profiles/profile/:user_id
- HTTP method: `GET`
- Return another `user`'s public `profile` information
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
    "user_id": 13,
    "gender": "female",
    "birthday": null,
    "profile_picture": null,
    "high_school": "Centennial High School",
    "university_name": "Korea University",
    "university_major": "Computer Science",
    "graduate_masters_name": null,
    "graduate_masters_major": null,
    "graduate_phd_name": null,
    "graduate_phd_major": null,
    "current_work_name": "Google",
    "current_work_position": "Developer"
    }
    ```

### /api/profiles/profile/update
- HTTP method: `PUT`
- Update own `user`'s public `profile` information
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response

### /api/profiles/work/self
- HTTP method: `GET`
- Return own `user`'s work history information
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
- Return another `user`'s work history information
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response

### /api/profiles/work/add
- HTTP method: `POST`
- Add a new item to `user`'s work history
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
        "authorization": "JWT token"
        }
        ```
- Response

### /api/profiles/work/update
- HTTP method: `PUT`
- Update own `user`'s work history information
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
- Response