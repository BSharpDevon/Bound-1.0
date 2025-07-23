import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx'; // Base Modal wrapper, handles backdrop, centering, close logic
import 'boxicons/css/boxicons.min.css'; // Icon library for search/add icons

/**
 * FriendsModal Component
 * ----------------------
 * A reusable modal UI for searching and adding friends anywhere in the app.
 *
 * Props:
 * - isOpen (bool): whether the modal should be visible
 * - onClose (func): callback to close the modal (e.g., clicking backdrop or ESC)
 * - searchUserEmail (string): current text in the search input field
 * - onSearchChange (func): handler invoked on input change to update searchUserEmail
 * - onAddFriend (func): handler to add a friend; if passed a user object, adds that user
 * - filteredUsers (array): list of { id, firstName, email } matching the search term
 */
function FriendsModal({
  isOpen,
  onClose,
  searchUserEmail,
  onSearchChange,
  onAddFriend,
  filteredUsers,
}) {
  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    // Wrap all content in the Modal component which handles overlay and close
    <Modal onClose={onClose}>
      {/* Title of the modal */}
      <h2>Friends</h2>

      {/* Search input for filtering users by name/email */}
      <input
        className="friend-search-input"
        type="text"
        placeholder="Search users by name or email"
        value={searchUserEmail}
        onChange={onSearchChange}
      />

      {/* Buttons for additional actions: search trigger or directly add by email */}
      <div className="friends-buttons-container">
        {/* This button could trigger an explicit search, if needed */}
        <button
          id="friends-search-button"
          onClick={() => {
            /* Optional: call a search API or refine local filtering */
          }}
        >
          <i className="bx bx-user-search" /> SEARCH
        </button>

        {/* Add friend by the current input (e.g., email) */}
        <button
          id="friends-add-button"
          onClick={() => onAddFriend(searchUserEmail)}
        >
          <i className="bx bx-user-plus" /> ADD
        </button>
      </div>

      {/* Display filtered user results with an Add button per user */}
      <div className="search-results">
        {filteredUsers.map((user) => (
          <div className="name-add" key={user.id}>
            {/* Show user's first name (could also include avatar/email) */}
            <p className="first-name">{user.firstName}</p>
            {/* Button to add this specific user object */}
            <button onClick={() => onAddFriend(user)}>Add</button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// Prop type definitions for runtime type checking and documentation
FriendsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  searchUserEmail: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onAddFriend: PropTypes.func.isRequired,
  filteredUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      email: PropTypes.string,
    })
  ).isRequired,
};

export default FriendsModal;