import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function Sidebar({ activeNav, setActiveNav, setIsModalOpen }) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <img id="logo" src={logo} alt="logo" width="32px" height="32px" />
        </div>
        <button className="nav-button" onClick={toggleDrawer}>
          <div className="nav-button__lines">
            <span className="nav-button__line"></span>
            <span className="nav-button__line"></span>
            <span className="nav-button__line"></span>
          </div>
        </button>
        <div className="sidebar-bottom">
          <button id="about-bound-button" onClick={() => {
            setActiveNav("about");
            setIsModalOpen(true);
          }}>ABOUT BIND</button>
        </div>
      </aside>

      <div className={`nav-project-drawer ${isDrawerOpen ? "active" : ""}`}>
        <ul>
          <li className="nav-project-drawer-item">
            <a
              href="#home"
              className={activeNav === "home" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav("home");
                navigate("/homepage");
              }}
            >
              <div className="nav-project-drawer-item-title">HOME</div>
            </a>
          </li>
          <hr />
          <li>
            <button className={`nav-link ${activeNav === "friends" ? "active" : ""}`}
              onClick={() => {
                setActiveNav("friends");
                setIsModalOpen(true);
              }}>
              <div className="nav-project-drawer-item-title">FRIENDS</div>
            </button>
          </li>
          <hr />
          <li className="nav-project-drawer-item">
            <a
              href="/bind"
              className={activeNav === "binds" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav("binds");
                navigate("/bind");
              }}
            >
              <div className="nav-project-drawer-item-title">BINDS</div>
            </a>
          </li>
          <hr />
          <li className="nav-project-drawer-item">
            <a
              href="/favourite-books"
              className={activeNav === "bookshelf" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav("bookshelf");
                navigate("/favourite-books");
              }}
            >
              <div className="nav-project-drawer-item-title">BOOKSHELF</div>
            </a>
          </li>
          <hr />
          <li className="nav-project-drawer-item">
            <button
              className={`nav-link ${activeNav === "about" ? "active" : ""}`}
              onClick={() => {
                setActiveNav("about");
                setIsModalOpen(true);
              }}
            >
              <div className="nav-project-drawer-item-title">ABOUT</div>
            </button>
          </li>
          <hr />
        </ul>
      </div>
    </>
  );
}

export default Sidebar;