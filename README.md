[한국어 버전](./README_kr.md)

Server-side API for _acqua_ written in Node.js

## API Endpoints

- Authentication
    - [x] [/api/auth/signup](#apiauthsignup)
    - [x] [/api/auth/signin](#apiauthsignin)  
- User Data Manipulation
    - [x] [/api/entries/get/:friend_id](#apientriesgetfriend_id)
    - [x] [/api/entries/post/:friend_id](#apientriespostfriend_id)
    - [x] [/api/friends/get](#apifriendsget)
    - [x] [/api/friends/add](#apifriendsadd)
    - [ ] [/api/profiles/basic](#apiprofilesbasic)
    - [ ] [/api/profiles/basic/update](#apiprofilesbasicupdate)
    - [ ] [/api/profiles/profile/:user_id](#apiprofilesprofileuser_id)
    - [ ] [/api/profiles/profile/update](#apiprofilesprofileupdate)
    - [ ] [/api/profiles/work/:user_id](#apiprofilesworkuser_id)
    - [ ] [/api/profiles/work/update](#apiprofilesworkupdate)

## API Description
#### /api/auth/signup
- HTTP method: `POST`
- Endpoint for a user to sign up
- On success, parameters are saved to the `users` table in the database
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
            "password": "$2a$10$LKzOuXTrjk2eFj735NUCiu6ecLLH/oYF2hvU4b6HDz7CgrxwtkEAi",
            "first_name": "Jordan",
            "last_name": "Belfort",
            "phone_number": "01049182881"
            }
	"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE0LCJpYXQiOjE1MzQ3NTI3MTAzMzF9.ZYo5qXNkGJ7l1rvCaKIYLknkUJNa3YjXT87Do-PyQZI"
	}
    ```
      
#### /api/auth/signin
#### /api/entries/get/:friend_id
#### /api/entries/post/:friend_id
#### /api/friends/get
#### /api/friends/add
#### /api/profiles/basic
#### /api/profiles/basic/update
#### /api/profiles/profile/:user_id
#### /api/profiles/profile/update
#### /api/profiles/work/:user_id
#### /api/profiles/work/update