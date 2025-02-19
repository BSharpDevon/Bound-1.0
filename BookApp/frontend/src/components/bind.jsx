import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function BindPage() {

  const navigate = useNavigate();

  // Select a friend to create a bind with
  const selectFriend = () => {
  };

  // State to toggle between start and result pages
  const [isBindComplete, setIsBindComplete] = useState(false);

  // Mock user data
  const firstNameInitial = "L";
  const userOneName = "Name1";
  const userTwoName = "Name2";
  const bookTitle = "A Court of Thorns and Roses";
  const bookAuthor = "Sarah J. Maas";

  const bookShop = () => {
    // Navigate to Bookshop.org
    window.location.href = 'https://bookshop.org/';  
  };

  // Navigate back to homepage
  const returnBtn = () => {
    navigate("/homepage");
  };

  // HTML and styling
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
            And we&apos;ve found the link just for you!
          </p>
          <button className="action-button" onClick={bookShop}>BUY ON BOOKSHOP.ORG</button>
          <button onClick={returnBtn}>BACK TO HOME</button>
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
          <label>
          <input
            type="text"
            placeholder="Select Friend"
            value={selectFriend}
          />
          </label>
          
          <button
            id="signUpButtonHomepage"
            onClick={() => selectFriend(true)}
          >
            INVITE
          </button>

          <button
            id="signUpButtonHomepage"
            onClick={() => setIsBindComplete(true)}
          >
            CONFIRM
          </button>
        </div>
      )}
    </div>
  );
}

export default BindPage;