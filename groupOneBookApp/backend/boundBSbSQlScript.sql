CREATE DATABASE bound_db;

USE bound_db;

-- Members table: Stores user details
CREATE TABLE members (
    member_id INT PRIMARY KEY AUTO_INCREMENT, -- Unique identifier for each user
	full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE CHECK (email LIKE '%@%'), -- Email must be unique and contain '@'
    password VARCHAR(100)                     -- Password (should ideally store hashed values)
);

DELETE FROM members WHERE member_id = 7;


ALTER TABLE members
ADD COLUMN privacy_checkbox BOOLEAN DEFAULT FALSE;

UPDATE members
SET privacy_checkbox = TRUE
WHERE member_id = 1;

SELECT * FROM members; 

SELECT * FROM members WHERE email = 'beth_sharp@groupone.com';

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

-- Bind Books table: Tracks which books are shared between members
CREATE TABLE bind_books (
    member_id INT,           -- The member who owns the book
    friend_id INT,           -- The friend with whom the book is bound
    book_id INT,             -- The book that is being shared
    FOREIGN KEY (member_id) REFERENCES members(member_id),   -- Links to members table
    FOREIGN KEY (friend_id) REFERENCES members(member_id),   -- Links to another member (friend)
    FOREIGN KEY (book_id) REFERENCES books(book_id),         -- Links to books table
    PRIMARY KEY (member_id, friend_id, book_id)               -- Composite primary key for uniqueness
);

SELECT * FROM bind_books;

CREATE TABLE bind_books (
    member_id INT,           -- The member who owns the book
    friend_id INT,           -- The friend with whom the book is bound
    book_id INT,             -- The book that is being shared
    FOREIGN KEY (member_id) REFERENCES members(member_id),   -- Links to members table
    FOREIGN KEY (friend_id) REFERENCES members(member_id),   -- Links to another member (friend)
    FOREIGN KEY (book_id) REFERENCES books(book_id),         -- Links to books table
    PRIMARY KEY (member_id, friend_id, book_id)               -- Composite primary key for uniqueness
);
