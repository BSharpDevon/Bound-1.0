CREATE DATABASE bound_db;

USE bound_db;

-- Members table: Stores user details
CREATE TABLE members (
    member_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique identifier for each user
	full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE CHECK (email LIKE '%@%'), -- Email must be unique and contain '@'
    password VARCHAR(100),                     -- Password (should ideally store hashed values)
    privacy_checkbox BOOLEAN DEFAULT FALSE
);

SELECT * FROM members; 

-- Book Catalogue: Stores book details
CREATE TABLE books (
    googlebook_id VARCHAR(50) PRIMARY KEY,  -- e.g., 'zyTCAlFPjgYC'
    title        VARCHAR(100),
    author       VARCHAR(100),
    genre        VARCHAR(100),
    synopsis     VARCHAR(500),
    review       VARCHAR(500)
);

SELECT * FROM books; 

CREATE TABLE favourite_books (
    member_id     INT NOT NULL,
    googlebook_id VARCHAR(50) NOT NULL,
    rating        INT CHECK (rating BETWEEN 1 AND 5),
    review        VARCHAR(255),
    PRIMARY KEY (member_id, googlebook_id),
    FOREIGN KEY (member_id)     REFERENCES members(member_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

SELECT * FROM favourite_books; 

-- Profiles table: Tracks member connections and reviews
CREATE TABLE profiles (
    profile_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique identifier for each profile entry
    member_id INT,                             -- Links to the member
    friend_id INT,                             -- Links to a friend (self-referencing members table)
    FOREIGN KEY (member_id) REFERENCES members(member_id), -- Links to members table
    FOREIGN KEY (friend_id) REFERENCES members(member_id)  -- Links to other members
);

SELECT * FROM profiles; 

CREATE TABLE bind_books (
    member_id     INT NOT NULL,
    friend_id     INT NOT NULL,
    googlebook_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (member_id, friend_id, googlebook_id),
    FOREIGN KEY (member_id)     REFERENCES members(member_id),
    FOREIGN KEY (friend_id)     REFERENCES members(member_id),
    FOREIGN KEY (googlebook_id) REFERENCES books(googlebook_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

SELECT * FROM bind_books;

-- Table to keep friend pairs + add new friendships

CREATE TABLE friends (
	friendship_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	inviter_id INT,
	invitee_id INT,
	FOREIGN KEY (inviter_id) REFERENCES members(member_id),
	FOREIGN KEY (invitee_id) REFERENCES members(member_id)
		ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM friends;

-- 2) Rebuild parent table: use Google Books ID as the PK
CREATE TABLE books (
    googlebook_id VARCHAR(50) PRIMARY KEY,  -- e.g., 'zyTCAlFPjgYC'
    title        VARCHAR(100),
    author       VARCHAR(100),
    genre        VARCHAR(100),
    synopsis     VARCHAR(500),
    review       VARCHAR(500)
);

