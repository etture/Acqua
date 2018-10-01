# acqua

<img src="./public/images/logo_white.png" width="200">

'acquaintance'의 앞글자를 딴 *acqua*는 지인과의 관계를 관리하는 서비스입니다. 자주 잊어버리곤 하는 친구, 동료, 가족 등 지인에 대한 정보 (생일 등 기본 정보부터 언제 무슨 얘기를 했는지 등)를 *acqua*에 메모하면, 다음에 만나기 전에 해당 정보를 알림 형태로 알려드립니다. *acqua* 내부 캘린더를 이용하여 친구와 일정 공유, 알림 등 추가 기능을 제공합니다.

# acqua API

*acqua*를 위한 RESTful API

서버는 Node.js로 작성, 데이터베이스는 MySQL

Heroku에 배포, 현 URL: *https://acqua-api.herokuapp.com*

[안드로이드 클라이언트](https://github.com/etture/acqua-android)

[React.js 웹 클라이언트](https://github.com/etture/acqua-client)

# 목차

- [API Endpoints](#api-endpoints)
- [API 설명](#api-설명)
- [Database Schema](#database-schema)

# API Endpoints

- [사용자 인증](#사용자-인증)
    - [x] [/api/auth/signup](#apiauthsignup) `POST`
    - [x] [/api/auth/signin](#apiauthsignin) `POST` 
- [사용자 입력](#사용자-입력)
    - [x] [/api/entries/get/:friend_id](#apientriesgetfriend_id) `GET`
    - [x] [/api/entries/post/:friend_id](#apientriespostfriend_id) `POST`
    - [x] [/api/entries/edit/:entry_id](#apientrieseditentry_id) `PUT`
- [친구 리스트](#친구-리스트)
    - [x] [/api/friends/get](#apifriendsget) `GET`
    - [x] [/api/friends/add](#apifriendsadd) `POST`
    - [x] [/api/friends/nickname/:friend_id](#apifriendsnicknamefriend_id) `PUT`
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
    - [x] [/api/profiles/work/add](#apiprofilesworkadd) `POST`
    - [x] [/api/profiles/work/update/:item_id](#apiprofilesworkupdateitem_id) `PUT`

# API 설명
## 사용자 인증
### /api/auth/signup
- HTTP method: `POST`
- `user`의 회원가입을 위한 endpoint
- 성공 시 데이터베이스 내 `users` 테이블에 parameter 저장되고 JWT 토큰이 반환
- Request
    - Body
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
    - Body
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
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
    - URL
        - `friend_id` (`entries` 테이블 `friend_id` 열 :left_right_arrow: `users` 테이블 `id` 열)
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
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
    - Body
        ```js
        {
        "memo": "사용자가 친구에 대해서 적은 메모"
        }
        ```
    - URL
        - `friend_id` (`entries` 테이블 `friend_id` 열 :left_right_arrow: `users` 테이블 `id` 열)
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
- `user`가 `friend`에 대해서 작성한 메모를 수정 (`entry_id`를 이용해 접근)
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
    - Body
        ```js
        {
        "memo": "수정된 메모"
        }
        ```
    - URL
        - `entry_id` (`entries` 테이블 `id` 열)
- Response
    ```js
    {
    "isSuccess": true,
    "user_id": 15,
    "friend_id": 13,
    "entry_id": 9
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
    {
        "friends_list": [
              {  
              "id": 7,
              "last_name": "박",
              "first_name": "민수",
              "email": "parkmark@gmail.com",
              "phone_number": "01099291028"
              },
              {
              "id": 9,
              "last_name": "정",
              "first_name": "순효",
              "email": "jongsoon@gmail.com",
              "phone_number": "01012345678"
              },
              ...
        ]
    }
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
    - Body
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

### /api/friends/nickname/:friend_id
- HTTP method: `PUT`
- `user`에게 보여질 `friend`의 별명을 수정
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"    
        }
        ```
    - Body
        ```js
        {
        "friend_id": "친구 id",
        "nickname": "새로운 별명"
        }
        ```
    - URL
        - `friend_id` (`friends` 테이블 `friend_id` 열 :left_right_arrow: `users` 테이블 `id` 열)
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
            "user_id": 116,
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
- 다른 `user`의 모든 프로필 정보 반환
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
    - URL
        - `user_id` (`users` 테이블 `id` 열 :left_right_arrow: `profiles` 테이블 `user_id` 열 :left_right_arrow: `works` 테이블 `user_id` 열)
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
            "user_id": 116,
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
    - URL
        - `user_id` (`users` 테이블 `id` 열)
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
- 각 request parameter에 대해서, `update` parameter가 `true` 이면 해당 항목이 `value`로 수정되고, `false`이면 수정되지 않음
- 응답 내 `updatedItems`는 수정된 항목들만 반환한다
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
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
    - Body
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
    "graduate_phd_major": null
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
    - URL
        - `user_id` (`profiles` 테이블 `user_id` 열 :left_right_arrow: `users` 테이블 `id` 열)
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
    "graduate_phd_major": null
    }
    ```

### /api/profiles/profile/update
- HTTP method: `PUT`
- `user` 본인의 공개 `profile` 정보 수정
- 각 request parameter에 대해서, `update` parameter가 `true` 이면 해당 항목이 `value`로 수정되고, `false`이면 수정되지 않음 
- 응답 내 `updatedItems`는 수정된 항목들만 반환한다
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
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
    ```js
    [  
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
    - URL
        - `user_id` (`works` 테이블 `user_id` 열 :left_right_arrow: `users` 테이블 `id` 열)
- Response
    ```js
    [  
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
    ]
    ```

### /api/profiles/work/add
- HTTP method: `POST`
- `user` 본인의 `work` 직업 이력 항목 추가
- `company`, `position`, `start_date`는 필수 parameter
- `end_date` can be included if `work` has ended, in which case the `ended` parameter should be set to `true` and `value` provided. `status` is set to `past` automatically.
- If `work` is ongoing, set `ended` to `false` and leave `value` empty. `status` is set to `current` automatically.
- Request
    - Header
        ```js
        {
        "authorization": "JWT 토큰"
        }
        ```
    - Body
        ```js
        {
        "company": "회사명",
        "position": "직급 혹은 직책",
        "start_date": "시작일",
        "end_date": {
        	"ended": true or false,
        	"value": "현재 직업이 아닐 시 종료일"
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
- `user` 본인의 `work` 직업 이력 항목 수정
- `start_date` 혹은 `end_date`가 수정될 때 (혹은 둘 다) `start_date`가 `end_date`보다 늦게 오지 않아야 한다. 조건 불충족 시 오류 메시지 반환.
- 응답에는 수정된 항목만 표출된다
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
        - `item_id` (`works` 테이블 `id` 열)
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
