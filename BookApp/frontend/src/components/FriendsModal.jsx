// FriendsModal.jsx
import React from "react";
import Modal from "./Modal"; // Make sure the Modal path is correct

const FriendsModal = ({
  isOpen,
  onClose,
  searchUserEmail,
  handleInputChange,
  handleAddFriend,
  filteredUsers,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <h2>Friends</h2>
      <input
        className="friend-search-input"
        type="text"
        placeholder="Search users by name"
        value={searchUserEmail}
        onChange={handleInputChange}
      />
      <div className="friends-buttons-container">
        <button id="friends-buttons" onClick={handleAddFriend}>
          <i className="bx bx-user-plus"></i> ADD
        </button>
      </div>
      <div className="search-results">
        {filteredUsers.map((user) => (
          <div className="name-add" key={user.id}>
            <p className="first-name">{user.firstName}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default FriendsModal;