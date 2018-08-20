*acqua*를 위한 RESTful API

서버는 Node.js로 작성

Heroku에 배포, 현 URL: *https://acqua-api.herokuapp.com*

# API Endpoints

- [사용자 인증](#사용자-인증)
    - [x] [/api/auth/signup](#apiauthsignup)
    - [x] [/api/auth/signin](#apiauthsignin)  
- [사용자 입력](#사용자-입력)
    - [x] [/api/entries/get/:friend_id](#apientriesgetfriend_id)
    - [x] [/api/entries/post/:friend_id](#apientriespostfriend_id)
- [친구 리스트](#친구-리스트)
    - [x] [/api/friends/get](#apifriendsget)
    - [x] [/api/friends/add](#apifriendsadd)
- [사용자 프로필](#사용자-프로필)
    - [ ] [/api/profiles/basic](#apiprofilesbasic)
    - [ ] [/api/profiles/basic/update](#apiprofilesbasicupdate)
    - [ ] [/api/profiles/profile/:user_id](#apiprofilesprofileuser_id)
    - [ ] [/api/profiles/profile/update](#apiprofilesprofileupdate)
    - [ ] [/api/profiles/work/:user_id](#apiprofilesworkuser_id)
    - [ ] [/api/profiles/work/update](#apiprofilesworkupdate)

# API 설명
## 사용자 인증
### /api/auth/signup
- HTTP method: `POST`
- `user`의 회원가입을 위한 endpoint
- 성공 시 데이터베이스 내 `users` 테이블에 parameter 저장되고 JWT 토큰이 반환
- Request
    - Parameters
        ```js
        {
	    "email": "이메일 주소",
	    "password": "비밀번호",
	    "first_name": "이름",
	    "last_name": "성",
	    "phone_number": "전화번호"
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
- `user`의 로그인을 위한 endpoint
- 성공 시 JWT 토큰이 반환
- Request
    - Parameters
        ```js
        {
        "email": "이메일 주소",
        "password": "비밀번호"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE0LCJpYXQiOjE1MzQ3NTI3MTAzMzF9.ZYo5qXNkGJ7l1rvCaKIYLknkUJNa3YjXT87Do-PyQZI"
    }
    ```

## 사용자 입력
### /api/entries/get/:friend_id
- HTTP method: `GET`
- `user`가 다른 `friend`에 대해서 적은 메모 `entry` 목록을 반환
- `user`는 header에 포함된 JWT 토큰으로 식별
- Request
    - Sample Dummy Request 정보
        - `user_id`: 2
        - `friend_id`: 8
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
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
- `user`가 다른 `friend`에 대해 적은 메모 `entry`를 데이터베이스에 저장
- Request
    - Sample Dummy Request 정보
        - `user_id`: 2
        - `friend_id`: 8
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
    - Parameters
        ```js
        {
        "memo": "사용자가 친구에 대해서 적은 메모"
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

## 친구 리스트
### /api/friends/get
- HTTP method: `GET`
- `user`가 가지고 있는 `friend` 목록 반환
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
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
- `user`에게 `friend` 추가
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
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

## 사용자 프로필
### /api/profiles/basic
- HTTP method: `GET`
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```

### /api/profiles/basic/update
- HTTP method: `POST`
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```

### /api/profiles/profile/:user_id
- HTTP method: `GET`

### /api/profiles/profile/update
- HTTP method: `POST`
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```

### /api/profiles/work/:user_id
- HTTP method: `GET`

### /api/profiles/work/update
- HTTP method: `POST`
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```