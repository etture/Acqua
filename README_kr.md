# acqua API

<img src="./public/images/logo_white.png" width="200">

*acqua*를 위한 RESTful API

서버는 Node.js로 작성

Heroku에 배포, 현 URL: *https://acqua-api.herokuapp.com*

# API Endpoints

- [사용자 인증](#사용자-인증)
    - [x] [/api/auth/signup](#apiauthsignup) `POST`
    - [x] [/api/auth/signin](#apiauthsignin) `POST` 
- [사용자 입력](#사용자-입력)
    - [x] [/api/entries/get/:friend_id](#apientriesgetfriend_id) `GET`
    - [x] [/api/entries/post/:friend_id](#apientriespostfriend_id) `POST`
- [친구 리스트](#친구-리스트)
    - [x] [/api/friends/get](#apifriendsget) `GET`
    - [x] [/api/friends/add](#apifriendsadd) `POST`
    - [x] [/api/friends/nickname](#apifriendsnickname) `PUT`
- [사용자 프로필](#사용자-프로필)
    - [x] [/api/profiles/basic](#apiprofilesbasic) `GET`
    - [ ] [/api/profiles/basic/update](#apiprofilesbasicupdate) `PUT`
    - [ ] [/api/profiles/basic/update_pw](#apiprofilesbasicupdate_pw) `PUT`
    - [ ] [/api/profiles/profile/:user_id](#apiprofilesprofileuser_id) `GET`
    - [ ] [/api/profiles/profile/update](#apiprofilesprofileupdate) `POST`
    - [ ] [/api/profiles/work/:user_id](#apiprofilesworkuser_id) `GET`
    - [ ] [/api/profiles/work/update](#apiprofilesworkupdate) `POST`

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
        "friend_id": "친구 id"
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
- `user`에게 보여질 `friend`의 별명을 수정
- Request
    - Sample Dummy Request 정보
            - `friend_id`: 7
            - `nickname`: "Wolverine"
    - Header
        ```js
        {
        "authorization": "JWT 토큰"    
        }
        ```
    - Parameters
        ```js
        {
        "friend_id": "친구 id",
        "nickname": "새로운 별명"
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

## 사용자 프로필
### /api/profiles/basic
- HTTP method: `GET`
- `user` 기본 개인정보 반환
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
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
- HTTP method: `POST`
- `user` 기본 개인정보 수정 (비밀번호 제외)
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
- Response

### /api/profiles/basic/update_pw
- HTTP method: `PUT`
- `user` 비밀번호 수정
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
- Response

### /api/profiles/profile/:user_id
- HTTP method: `GET`
- `user` 공개 프로필 정보 반환
- Request
- Response

### /api/profiles/profile/update
- HTTP method: `POST`
- `user` 공개 프로필 정보 수정
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
- Response

### /api/profiles/work/:user_id
- HTTP method: `GET`
- `user` 직업 정보 반환
- Request
- Response

### /api/profiles/work/update
- HTTP method: `POST`
- `user` 직업 정보 수정
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
- Response