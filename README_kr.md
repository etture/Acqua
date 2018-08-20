*acqua*를 위한 RESTful API
서버는 Node.js로 작성

## API Endpoints

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

## API 설명
### 사용자 인증
#### /api/auth/signup
- HTTP method: `POST`
- 사용자의 회원가입을 위한 endpoint
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
- 사용자의 로그인을 위한 endpoint
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

### 사용자 입력
#### /api/entries/get/:friend_id
- HTTP method: `GET`
- 사용자가 다른 친구에 대해서 적은 메모 목록을 반환
- 사용자는 header에 포함된 JWT 토큰으로 식별
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
    ]
    ```

#### /api/entries/post/:friend_id
- HTTP method: `POST`

### 친구 리스트
#### /api/friends/get
- HTTP method: `GET`

#### /api/friends/add
- HTTP method: `POST'

### 사용자 프로필
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