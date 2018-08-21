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
    - [ ] [/api/entries/edit/:entry_id](#apientriesputentry_id) `PUT`
- [친구 리스트](#친구-리스트)
    - [x] [/api/friends/get](#apifriendsget) `GET`
    - [x] [/api/friends/add](#apifriendsadd) `POST`
    - [x] [/api/friends/nickname](#apifriendsnickname) `PUT`
- [사용자 프로필](#사용자-프로필)
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
    - [ ] [/api/profiles/work/add](#apiprofilesworkadd) `POST`
    - [ ] [/api/profiles/work/update](#apiprofilesworkupdate) `PUT`

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

### /api/entries/edit/:entry_id
- HTTP method: `PUT`
- `user`가 `friend`에 대해서 작성한 메모를 수정 (`entry` id를 이용해 접근)
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
      "last_name": "박",
      "first_name": "민수",
      "email": "parkmark@gmail.com",
      "phone_number": "01099291028"
      },
      {
      "friend_id": 9,  
      "last_name": "정",
      "first_name": "순효",
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
### /api/profiles/self
- HTTP method: `GET`
- `user` 본인의 모든 프로필 정보 반환
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
    "complete_profile": {
            "id": 116,
            "last_name": "이",
            "first_name": "선우",
            "email": "paul@gmail.com",
            "phone_number": "01031887610",
            "gender": "male",
            "birthday": null,
            "profile_picture": null,
            "high_school": "청담고등학교",
            "university_name": "연세대학교",
            "university_major": "산업공학",
            "graduate_masters_name": null,
            "graduate_masters_major": null,
            "graduate_phd_name": null,
            "graduate_phd_major": null,
            "current_work_name": "트위터",
            "current_work_position": "개발자"
        },
    "work_history": [
            {
                "id": 97,
                "user_id": 116,
                "status": "current",
                "company": "트위터",
                "position": "개발자",
                "start_date": "2017-06-20T15:00:00.000Z",
                "end_date": null
            },
            {
                "id": 182,
                "user_id": 116,
                "status": "past",
                "company": "삼성",
                "position": "인턴",
                "start_date": "2015-11-22T15:00:00.000Z",
                "end_date": null
            }
        ]
    }
    ```

### /api/profiles/:user_id
- HTTP method: `GET`
- 다른 `user`의 모든 프로필 정보 반환
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
    "complete_profile": {
            "id": 116,
            "last_name": "이",
            "first_name": "선우",
            "email": "paul@gmail.com",
            "phone_number": "01031887610",
            "gender": "male",
            "birthday": null,
            "profile_picture": null,
            "high_school": "청담고등학교",
            "university_name": "연세대학교",
            "university_major": "산업공학",
            "graduate_masters_name": null,
            "graduate_masters_major": null,
            "graduate_phd_name": null,
            "graduate_phd_major": null,
            "current_work_name": "트위터",
            "current_work_position": "개발자"
        },
    "work_history": [
            {
                "id": 97,
                "user_id": 116,
                "status": "current",
                "company": "트위터",
                "position": "개발자",
                "start_date": "2017-06-20T15:00:00.000Z",
                "end_date": null
            },
            {
                "id": 182,
                "user_id": 116,
                "status": "past",
                "company": "삼성",
                "position": "인턴",
                "start_date": "2015-11-22T15:00:00.000Z",
                "end_date": null
            }
        ]
    }
    ```

### /api/profiles/basic/self
- HTTP method: `GET`
- `user` 본인의 기본 개인정보 반환
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
    
### /api/profiles/basic/:user_id
- HTTP method: `GET`
- 다른 `user`의 기본 정보 반환
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
- HTTP method: `PUT`
- `user` 본인의 기본 개인정보 수정 (비밀번호 제외)
- 만약 request parameter가 빈 문자열이면 해당 항목은 수정되지 않음
- 만약 request parameter가 문자열을 포함하면 해당 항목은 그 문자열로 수정됨
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
        "last_name": "수정된 항목 혹은 빈 문자열",
        "first_name": "수정된 항목 혹은 빈 문자열",
        "email": "수정된 항목 혹은 빈 문자열",
        "phone_number": "수정된 항목 혹은 빈 문자열"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "updatedItems": {  
        "last_name": "김",
        "first_name": "철수",
        "email": "chulsoo@gmail.com"
        "phone_number": "01012345678"
        }
    }
    ```

### /api/profiles/basic/update_pw
- HTTP method: `PUT`
- `user` 본인의 비밀번호 수정
- 기존 비밀번호와 새 비밀번호를 parameter로 받음
- 기존 비밀번호가 일치할 시 요청 실행하고 불일치 시 오류 발생 
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
        "old_password": "기존 비밀번호",
        "new_password": "새로운 비밀번호"
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
- `user` 본인의 공개 프로필 정보 반환
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
    "user_id": 13,
    "gender": "female",
    "birthday": null,
    "profile_picture": null,
    "high_school": "청담고등학교",
    "university_name": "고려대학교",
    "university_major": "컴퓨터공학",
    "graduate_masters_name": null,
    "graduate_masters_major": null,
    "graduate_phd_name": null,
    "graduate_phd_major": null,
    "current_work_name": "Google",
    "current_work_position": "개발자"
    }
    ```

### /api/profiles/profile/:user_id
- HTTP method: `GET`
- 다른 `user`의 공개 프로필 정보 반환
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
    "user_id": 13,
    "gender": "female",
    "birthday": null,
    "profile_picture": null,
    "high_school": "청담고등학교",
    "university_name": "고려대학교",
    "university_major": "컴퓨터공학",
    "graduate_masters_name": null,
    "graduate_masters_major": null,
    "graduate_phd_name": null,
    "graduate_phd_major": null,
    "current_work_name": "Google",
    "current_work_position": "개발자"
    }
    ```

### /api/profiles/profile/update
- HTTP method: `PUT`
- `user` 본인의 공개 `profile` 정보 수정 (`current_work` 정보 제외)
- 수정되지 않을 항목들은 parameter에 `null`이나 빈 문자열로 넘겨준다 
- 응답 내 `updatedItems`는 수정된 항목들만 반환한다
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
        "gender": "male 혹은 female / null || ''",
        "birthday": "생일 yyyy-mm-dd / null || ''",
        "profile_picture": "이미지 파일 경로 / null || ''",
        "high_school": "고등학교 이름 / null || ''",
        "university_name": "학부 대학교 이름 / null || ''",
        "university_major": "학부 전공 / null || ''",
        "graduate_masters_name": "대학원 이름 (석사) / null || ''",
        "graduate_masters_major": "석사 전공 / null || ''",
        "graduate_phd_name": "대학원 이름 (박사) / null || ''",
        "graduate_phd_major": "박사 전공 / null || ''"
        }
        ```
- Response
    ```js
    {
    "isSuccess": true,
    "updatedItems": {
        "gender": "male",
        "birthday": "1994-07-18",
        "profile_picture": "path/images/1923812.png"
        "high_school": "청담고등학교",
        "university_name": "연세대학교",
        "university_major": "문화인류학",
        "graduate_masters_name": "Harvard University",
        "graduate_masters_major": "정치외교학",
        "graduate_phd_name": "Yale University",
        "graduate_phd_major": "경제학"
        }
    }
    ```

### /api/profiles/work/self
- HTTP method: `GET`
- `user` 본인의 `work` 직업 이력 정보 반환
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
      "id": 231,
      "user_id": 16,
      "status": "current",
      "company": "구글",
      "position": "개발자",
      "start_date": "2017-06-20T15:00:00.000Z",
      "end_date": null
      },
      {
      "id": 320,
      "user_id": 16,
      "status": "past",
      "company": "삼성",
      "position": "인턴",
      "start_date": "2015-11-22T15:00:00.000Z",
      "end_date": null
      },
      ...
    ]
    ```

### /api/profiles/work/:user_id
- HTTP method: `GET`
- 다른 `user`의 `work` 직업 이력 정보 반환
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
      "id": 231,
      "user_id": 16,
      "status": "current",
      "company": "구글",
      "position": "개발자",
      "start_date": "2017-06-20T15:00:00.000Z",
      "end_date": null
      },
      {
      "id": 320,
      "user_id": 16,
      "status": "past",
      "company": "삼성",
      "position": "인턴",
      "start_date": "2015-11-22T15:00:00.000Z",
      "end_date": null
      },
      ...
    ]
    ```

### /api/profiles/work/add
- HTTP method: `POST`
- `user` 본인의 `work` 직업 이력 항목 추가  
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
        
        }
        ```
- Response

### /api/profiles/work/update
- HTTP method: `PUT`
- `user` 본인의 `work` 직업 이력 항목 수정
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
- Response