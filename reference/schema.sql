CREATE TABLE users (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  first_name   VARCHAR(100) NOT NULL,
  last_name    VARCHAR(100) NOT NULL,
  email        VARCHAR(150) NOT NULL,
  password     VARCHAR(150) NOT NULL,
  phone_number VARCHAR(15)  NOT NULL
);

CREATE TABLE entries (
  id            INT                AUTO_INCREMENT PRIMARY KEY,
  user_id       INT       NOT NULL,
  friend_id     INT       NOT NULL,
  memo          TEXT      NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  last_modified TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (friend_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE profiles (
  user_id                INT NOT NULL UNIQUE,
  gender                 VARCHAR(10),
  birthday               DATE,
  profile_picture        VARCHAR(150),
  high_school            VARCHAR(150),
  university_name        VARCHAR(150),
  university_major       VARCHAR(150),
  graduate_masters_name  VARCHAR(150),
  graduate_masters_major VARCHAR(150),
  graduate_phd_name      VARCHAR(150),
  graduate_phd_major     VARCHAR(150),
  current_work_name      VARCHAR(150),
  current_work_position  VARCHAR(150),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE works (
  id         INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id    INT          NOT NULL,
  status     VARCHAR(10)  NOT NULL,
  company    VARCHAR(150) NOT NULL,
  position   VARCHAR(150) NOT NULL,
  start_date DATE         NOT NULL,
  end_date   DATE,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE friends (
  user_id   INT NOT NULL,
  friend_id INT NOT NULL,
  nickname  VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (friend_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  UNIQUE (user_id, friend_id)
);
