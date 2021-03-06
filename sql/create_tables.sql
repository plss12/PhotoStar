DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Valorations;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Friends;



CREATE TABLE Users (
    userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    telephone VARCHAR(32) NOT NULL,
    username VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    avatarUrl VARCHAR(512)
    );

CREATE TABLE Photos (
    photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(128) NOT NULL,
    description VARCHAR(512),
    url VARCHAR(512) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(128) NOT NULL,
    visibility VARCHAR(16) NOT NULL, 
    CONSTRAINT ValidVisibility CHECK (visibility in ('Public', 'Private'))
);

CREATE TABLE Categories (
    categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) UNIQUE NOT NULL,
    descripcion VARCHAR(512),
    foto VARCHAR(512) NOT NULL
);

CREATE TABLE Valorations (
    valorationId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    photoId INT NOT NULL,
    value INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT NoRepeat UNIQUE (userId,photoId),
    CONSTRAINT ValidValue CHECK (value in (1,2,3,4,5))
);

CREATE TABLE Comments (
    commentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(512),
    photoId INT NOT NULL,
    userId INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE Friends (
    userId1 INT NOT NULL,
    userId2 INT NOT NULL,
    CONSTRAINT NoRepeat UNIQUE (userId1,userId2),
    PRIMARY KEY (userId1, userId2)
    );