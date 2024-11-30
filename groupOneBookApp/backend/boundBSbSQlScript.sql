CREATE DATABASE bound_db;

USE bound_db;

-- Members table: Stores user details
CREATE TABLE members (
    member_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique identifier for each user
    username VARCHAR(25) UNIQUE,              -- Unique username
    first_name VARCHAR(50),                   -- First name of the user
    last_name VARCHAR(50),                    -- Last name of the user
    email VARCHAR(100) UNIQUE CHECK (email LIKE '%@%'), -- Email must be unique and contain '@'
    password VARCHAR(100)                     -- Password (should ideally store hashed values)
);

SELECT * FROM members; 

CREATE TABLE favourite_books (
    member_id INT,                             -- Links to the member who liked the book
    book_id INT,                               -- Links to the book being rated
    rating INT CHECK (rating BETWEEN 1 AND 5), -- Rating (1 to 5 scale)
    review VARCHAR(255),                       -- User's review of the book
    PRIMARY KEY (member_id, book_id),          -- Composite primary key for uniqueness
    FOREIGN KEY (member_id) REFERENCES members(member_id), -- Links to members table
    FOREIGN KEY (book_id) REFERENCES books(book_id)        -- Links to books table
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

-- Book Catalogue: Stores book details
CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,   -- Unique identifier for each book
    title VARCHAR(100),                       -- Book title
    author VARCHAR(100),                      -- Author of the book
    genre VARCHAR(100),                       -- Genre of the book
    synopsis VARCHAR(500),                    -- Brief synopsis of the book
    review VARCHAR(500)                       -- General review for the book
);

SELECT * FROM books; 