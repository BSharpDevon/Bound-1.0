import { useState } from "react";
import logo from "../assets/images/logo.svg";

function BindPage() {
// Filter friends - code to be edited to input button function
  const setIsFriendSelected = users.filter(
    if ()
    (user) =>
    user.name.toLowerCase().includes(searchUserName.toLowerCase())
  );
    const handleAddFriend = (user) => {
    setUserBinds((prevBinds) => {
      if (prevBinds.some((bind) => bind.email === user.email)) {
        alert(`${user.firstName} is already your friend.`);
        return prevBinds;
      }
      return [...prevBinds, user];
    });
  };

  // State to toggle between start and result pages
  const [isBindComplete, setIsBindComplete] = useState(false);

  // Mock user data
  const firstNameInitial = "L";
  const userOneName = "Name1";
  const userTwoName = "Name2";
  const bookTitle = "A Court of Thorns and Roses";
  const bookAuthor = "Sarah J. Maas";

  return (
    <div>
      {/* Logo */}
      <div className="homepage-logo">
        <img id="logo" src={logo} alt="Bound Logo" />
      </div>
      {/* Conditional Rendering */}
      {isBindComplete ? (
        <div className={`bind-content ${isBindComplete ? "fade-in" : ""}`}>
          {/* Bind Result Page */}
          <h1 className="bind-header">
            {userOneName} & {userTwoName}
          </h1>
          <h3 className="book-title">Your Next Chapter Awaits</h3>
          <div className="book-container">
            <img
              className="book-cover"
              src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620324329i/50659467.jpg" // Replace with actual book cover URL
              alt="Book Cover"
            />
          </div>
          <p className="bind-description">
            The book that binds you two together is <b>{bookTitle}</b> by <b>{bookAuthor}</b>.
            And we’ve found the link just for you!
          </p>
          <button className="action-button">BUY ON BOOKSHOP.ORG</button>
        </div>
      ) : (
        <div className="bind-content">
          {/* Bind Start Page */}
          <h2 className="bind-header">Get ready for a story as unique as the two of you</h2>
          <p>
            See how your literary taste matches, and get a book recommendation
            you can both dive into.
          </p>
          <div className="circle-container">
            <div className="circle initials-circle">{firstNameInitial}</div>
            <div className="circle plus-circle">+</div>
          </div>
          <button
            id="signUpButtonHomepage"
            onClick={() => setIsFriendSelected(true)}
          >
            SELECT FRIEND
          </button>
          <button
            id="signUpButtonHomepage"
            onClick={() => setIsBindComplete(true)}
          >
            INVITE
          </button>
        </div>
      )}
    </div>
  );
}

export default BindPage;