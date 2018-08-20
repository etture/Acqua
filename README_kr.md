_acqua_를 위한 서버 API (Node.js)

## API Endpoints

- 사용자 인증
    - [x] [/api/auth/signup](#apiauthsignup)
    - [x] [/api/auth/signin](#apiauthsignin)  
- 사용자 정보 관련
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

## API 설명
#### /api/auth/signup
- HTTP method: `POST`
- 사용자의 회원가입을 위한 endpoint
- 성공 시 데이터베이스 내 `users` 테이블에 parameter 저장
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
            "password": "$2a$10$LKzOuXTrjk2eFj735NUCiu6ecLLH/oYF2hvU4b6HDz7CgrxwtkEAi",
            "first_name": "Jordan",
            "last_name": "Belfort",
            "phone_number": "01049182881"
            }
	"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE0LCJpYXQiOjE1MzQ3NTI3MTAzMzF9.ZYo5qXNkGJ7l1rvCaKIYLknkUJNa3YjXT87Do-PyQZI"
	}
    ```
    
#### /api/auth/signin
#### /api/auth/signup
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