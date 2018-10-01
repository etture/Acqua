# acqua

<img src="./public/images/logo_white.png" width="200">

Short for 'acquaintance', *acqua* is a service for managing your acquaintances. Never forget anything about your friends, coworkers, and family again; make memos on *acqua*, and it will remind you of your friends' details right before you meet them. Use the *acqua* calendar for additional functionality like schedule integration with your friends and reminders. 

# acqua API

[한국어 버전](./README_kr.md)

RESTful API for *acqua* 

Server written in Node.js, database in MySQL

Deployed to Heroku, current URL: *https://acqua-api.herokuapp.com*

[Android Client](https://github.com/etture/acqua-android)

[React.js Web Client](https://github.com/etture/acqua-client)

# Table of Contents

- [API Endpoints](#api-endpoints)
- [API Description](#api-description)
- [Database Schema](#database-schema)

# API Endpoints

- [Authentication](#authentication)
    - [x] [/api/auth/signup](#apiauthsignup) `POST`
    - [x] [/api/auth/signin](#apiauthsignin)  `POST`
- [User Entries](#user-entries)
    - [x] [/api/entries/get/:friend_id](#apientriesgetfriend_id) `GET`
    - [x] [/api/entries/post/:friend_id](#apientriespostfriend_id) `POST`
    - [x] [/api/entries/edit/:entry_id](#apientrieseditentry_id) `PUT`    
- [Friends List](#friends-list)
    - [x] [/api/friends/get](#apifriendsget) `GET`
    - [x] [/api/friends/add](#apifriendsadd) `POST`
    - [x] [/api/friends/nickname/:friend_id](#apifriendsnicknamefriend_id) `PUT`
- [User Profile](#user-profile)
    - [x] [/api/profiles/self](#apiprofilesself) `GET`
    - [x] [/api/profiles/:user_id](#apiprofilesuser_id) `GET`
    - [x] [/api/profiles/basic/self](#apiprofilesbasicself) `GET`
    - [x] [/api/profiles/basic/:user_id](#apiprofilesbasicuser_id) `GET`
    - [x] [/api/profiles/basic/update](#apiprofilesbasicupdate) `PUT`
    - [x] [/api/profiles/basic/update_pw](#apiprofilesbasicupdate_pw) `PUT`
    - [x] [/api/profiles/profile/self](#apiprofilesprofileself) `GET`
    - [x] [/api/profiles/profile/:user_id](#apiprofilesprofileuser_id) `GET`
    - [x] [/api/profiles/profile/update](#apiprofilesprofileupdate) `PUT`
    - [x] [/api/profiles/work/self](#apiprofilesworkself) `GET`
    - [x] [/api/profiles/work/:user_id](#apiprofilesworkuser_id) `GET`
    - [x] [/api/profiles/work/add](#apiprofilesworkadd) `POST`
    - [x] [/api/profiles/work/update/:item_id](#apiprofilesworkupdateitem_id) `PUT`

# API Description
## Authentication
### /api/auth/signup
- HTTP method: `POST`
- Endpoint for `user` to sign up
- On success, parameters are saved to the `users` table in the database and a JWT token is returned
- Request
    - Body
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
    - Body
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
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - URL
        - `friend_id` (`entries` table `friend_id` column :left_right_arrow: `users` table `id` column)
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
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Body
        ```js
        {
        "memo": "memo about a friend"
        }
        ```
    - URL
        - `friend_id` (`entries` table `friend_id` column :left_right_arrow: `users` table `id` column)
- Response
    ```js
    {  
    "isSuccess": true,
    "user_id": 2,
    "friend_id": 8,
    "entry_id": 610
    }
    ```

### /api/entries/edit/:entry_id
- HTTP method: `PUT`
- Edit `user`'s memo about `friend` using `entry_id`
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Body
        ```js
        {
        "memo": "edited memo"
        }
        ```
    - URL
        - `entry_id` (`entries` table `id` column)
- Response
    ```js
    {
    "isSuccess": true,
    "user_id": 15,
    "friend_id": 13,
    "entry_id": 9
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
    {
        "friends_list": [
              {  
              "id": 7,
              "last_name": "Park",
              "first_name": "Mark",
              "email": "parkmark@gmail.com",
              "phone_number": "01099291028"
              },
              {
              "id": 9,
              "last_name": "Jong",
              "first_name": "Soon",
              "email": "jongsoon@gmail.com",
              "phone_number": "01012345678"
              },
              ...
        ]
    }
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
    - Body
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

### /api/friends/nickname/:friend_id
- HTTP method: `PUT`
- Edit `friend`'s nickname to be displayed to `user`
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"    
        }
        ```
    - Body
        ```js
        {
        "nickname": "new nickname"
        }
        ```
    - URL
        - `friend_id` (`friends` table `friend_id` column :left_right_arrow: `users` table `id` column)
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
- Return own `user`'s complete profile information
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
    "basic_profile": {  
            "id": 116,
            "last_name": "Lee",
            "first_name": "Paul",
            "email": "paul@gmail.com",
            "phone_number": "01031887610"
        },
    "expanded_profile": {
            "gender": "male",
            "birthday": null,
            "profile_picture": null,
            "high_school": "Walnut High School",
            "university_name": "Emory University",
            "university_major": "Computer Science",
            "graduate_masters_name": null,
            "graduate_masters_major": null,
            "graduate_phd_name": null,
            "graduate_phd_major": null
        },
    "work_history": [
            {
            "id": 231,
            "user_id": 116,
            "status": "current",
            "company": "Twitter",
            "position": "Developer",
            "start_date": "2017-06-20T15:00:00.000Z",
            "end_date": null
            },
            {
            "id": 182,
            "user_id": 116,
            "status": "past",
            "company": "Samsung",
            "position": "Intern",
            "start_date": "2015-11-22T15:00:00.000Z",
            "end_date": null
            },
            ...
        ]
    "current_work": [
            {
            "id": 231,
            "user_id": 16,
            "status": "current",
            "company": "Twitter",
            "position": "Developer",
            "start_date": "2017-06-20T15:00:00.000Z",
            "end_date": null  
            },
            ...    
        ]
    }
    ```

### /api/profiles/:user_id
- HTTP method: `GET`
- Return another `user`'s complete profile information
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - URL
        - `user_id` (`users` table `id` column :left_right_arrow: `profiles` table `user_id` column :left_right_arrow: `works` table `user_id` column)
- Response
    ```js
    {
    "basic_profile": {
            "id": 116,
            "last_name": "Lee",
            "first_name": "Paul",
            "email": "paul@gmail.com",
            "phone_number": "01031887610"
        },
    "expanded_profile": {
            "gender": "male",
            "birthday": null,
            "profile_picture": null,
            "high_school": "Walnut High School",
            "university_name": "Emory University",
            "university_major": "Computer Science",
            "graduate_masters_name": null,
            "graduate_masters_major": null,
            "graduate_phd_name": null,
            "graduate_phd_major": null
        },
    "work_history": [
            {
            "id": 231,
            "user_id": 116,
            "status": "current",
            "company": "Twitter",
            "position": "Developer",
            "start_date": "2017-06-20T15:00:00.000Z",
            "end_date": null
            },
            {
            "id": 182,
            "user_id": 116,
            "status": "past",
            "company": "Samsung",
            "position": "Intern",
            "start_date": "2015-11-22T15:00:00.000Z",
            "end_date": null
            },
            ...
        ]
    "current_work": [
            {
            "id": 231,
            "user_id": 16,
            "status": "current",
            "company": "Twitter",
            "position": "Developer",
            "start_date": "2017-06-20T15:00:00.000Z",
            "end_date": null  
            },
            ...    
        ]
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
    - URL
        - `user_id` (`users` table `id` column)
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
- For each request parameter, if the `update` parameter is `true`, the item is updated to `value`; if `false`, the item is not updated
- `updatedItems` in the response contains only items that were updated
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Body
        ```js
        {
        "last_name": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "first_name": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "email": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "phone_number": {
        	"update": true or false,
        	"value": "updated value"
        	}
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
    - Body
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
    "graduate_phd_major": null
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
    - URL
        - `user_id` (`profiles` table `user_id` column :left_right_arrow: `users` table `id` column)
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
    "graduate_phd_major": null
    }
    ```

### /api/profiles/profile/update
- HTTP method: `PUT`
- Update own `user`'s public `profile` information
- For each request parameter, if the `update` parameter is `true`, the item is updated to `value`; if `false`, the item is not updated
- `updatedItems` in the response contains only items that were updated
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Body
        ```js
        {
        "gender": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "birthday": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "profile_picture": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "high_school": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "university_name": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "university_major": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "graduate_masters_name": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "graduate_masters_major": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "graduate_phd_name": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "graduate_phd_major": {
        	"update": true or false,
        	"value": "updated value"
        	}
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "updatedItems": {
        "gender": "male",
        "birthday": "1994-07-18",
        "profile_picture": "path/images/1923812.png",
        "high_school": "Los Osos High School",
        "university_name": "Brown University",
        "university_major": "Anthropology",
        "graduate_masters_name": "Harvard University",
        "graduate_masters_major": "Political Science",
        "graduate_phd_name": "Yale University",
        "graduate_phd_major": "Economics"
        }
    }
    ```

### /api/profiles/work/self
- HTTP method: `GET`
- Return own `user`'s `work` history information
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
      "work_history": [
          {
          "id": 231,
          "user_id": 16,
          "status": "current",
          "company": "Google",
          "position": "Developer",
          "start_date": "2017-06-20T15:00:00.000Z",
          "end_date": null
          },
          {
          "id": 320,
          "user_id": 16,
          "status": "past",
          "company": "Samsung",
          "position": "Intern",
          "start_date": "2015-11-22T15:00:00.000Z",
          "end_date": null
          },
          ...
        ],
      "current_work": [
          {
          "id": 231,
          "user_id": 16,
          "status": "current",
          "company": "Google",
          "position": "Developer",
          "start_date": "2017-06-20T15:00:00.000Z",
          "end_date": null  
          },
          ...    
        ]
    }
    ```

### /api/profiles/work/:user_id
- HTTP method: `GET`
- Return another `user`'s `work` history information
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - URL
        - `user_id` (`works` table `user_id` column :left_right_arrow: `users` table `id` column)
- Response
    ```js
    {  
      "work_history": [
          {
          "id": 231,
          "user_id": 16,
          "status": "current",
          "company": "Google",
          "position": "Developer",
          "start_date": "2017-06-20T15:00:00.000Z",
          "end_date": null
          },
          {
          "id": 320,
          "user_id": 16,
          "status": "past",
          "company": "Samsung",
          "position": "Intern",
          "start_date": "2015-11-22T15:00:00.000Z",
          "end_date": null
          },
          ...
        ],
      "current_work": [
          {
          "id": 231,
          "user_id": 16,
          "status": "current",
          "company": "Google",
          "position": "Developer",
          "start_date": "2017-06-20T15:00:00.000Z",
          "end_date": null  
          },
          ...    
        ]
    }
    ```

### /api/profiles/work/add
- HTTP method: `POST`
- Add a new item to `user`'s `work` history
- `company`, `position`, `start_date` are required parameters
- `end_date` can be included if `work` has ended, in which case the `ended` parameter should be set to `true` and `value` provided. `status` is set to `past` automatically.
- If `work` is ongoing, set `ended` to `false` and leave `value` empty. `status` is set to `current` automatically.
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Body
        ```js
        {
        "company": "company name",
        "position": "job position",
        "start_date": "starting date",
        "end_date": {
        	"ended": true or false,
        	"value": "ending date if work ended"
        	}
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "work": {  
        "id": 118,
        "user_id": 165,
        "company": "JP Morgan",
        "position": "Financial Analyst",
        "start_date": "2016-08-01",
        "end_date": "2018-06-01",
        "status": "past"     
        }
    }
    ```

### /api/profiles/work/update/:item_id
- HTTP method: `PUT`
- Update own `user`'s `work` history information
- Whenever both of, or either one of, `start_date` and `end_date` are updated, it must be checked that `start_date` is not later than `end_date`. If the conditions are not met, an error message is returned.
- Only items that have been updated are shown in the response
- Request
    - Header
        ```js
        {
        "authorization": "JWT token"
        }
        ```
    - Body
        ```js
        {
        "company": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "position": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "start_date": {
        	"update": true or false,
        	"value": "updated value"
        	},
        "end_date": {
        	"update": true or false,
        	"value": "updated value"
        	}
        }
        ```
    - URL
        - `item_id` (`works` table `id` column)
- Response
    ```js
    {
    "isSuccess": true,
    "work_updated": {
        "id": "12",
        "user_id": 15,
        "company": "Hyundai Motors",
        "position": "Marketer",
        "start_date": "2017-06-13",
        "end_date": null,
        "status": "current"
        }
    }
    ```

# Database Schema

[Database Schema](./reference/schema.sql)
