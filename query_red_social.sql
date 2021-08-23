CREATE DATABASE Red_Social;

USE Red_Social;


CREATE TABLE Users(
	 id int NOT NULL IDENTITY (1,1),
	 img text NOT NULL,
	 name varchar (50) NOT NULL,
	 address varchar (50) NOT NULL,
	 email varchar(50) NOT NULL,
	 password varchar(60) NOT NULL,
	 age INT NOT NULL,
	 studies varchar (50) NOT NULL,
	 languages varchar (50) NOT NULL,
	 linkedin text NOT NULL,
	 hobbies varchar (50) NOT NULL,
	 status tinyint NOT NULL,
	 role varchar (20) NOT NULL
	 PRIMARY KEY (id)
	 );

CREATE TABLE Technologies (
	 id int NOT NULL IDENTITY (1,1),
	 title varchar (50) NOT NULL,
	 PRIMARY KEY (id)
	 );

CREATE TABLE Qualifications (
	 id int NOT NULL IDENTITY (1,1),
     stars NUMERIC(2,1) NOT NULL,
	 id_technology INT NOT NULL,
	 id_user INT NOT NULL,
	 PRIMARY KEY (id),
	 FOREIGN KEY (id_technology) REFERENCES Technologies(id),
	 FOREIGN KEY (id_user) REFERENCES Users(id),
	 );


CREATE TABLE Friendships (
    id int NOT NULL IDENTITY (1,1),
    id_friend INT NOT NULL,
    id_user INT NOT NULL,
	accepted BIT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_friend) REFERENCES Users(id),
	FOREIGN KEY (id_user) REFERENCES Users(id)
    );



INSERT INTO Technologies(title) VALUES ('Elixir');
INSERT INTO Technologies(title) VALUES ('Node.js');
INSERT INTO Technologies(title) VALUES ('Angular');
INSERT INTO Technologies(title) VALUES ('Phoenix');
INSERT INTO Technologies(title) VALUES ('Mulesoft');

