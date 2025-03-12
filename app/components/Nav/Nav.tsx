import React, { useState } from "react";
import { NavLink } from "react-router";

const Nav: React.FC<{ onClick: (selected: string) => void }> = ({ onClick }) => {
  const [active, setActive] = useState("");
  const handleClick = (selected: string) => {
    onClick(selected);
    setActive(selected);
  };

  return (
    <nav className="nav">
      <section className="nav__top">
        <NavLink to="/direct-message">
          <button className={`nav__link ${active == "direct-message" ? "nav__link-active" : ""}`} onClick={() => handleClick("direct-message")}>
            <i className="fa-regular fa-comments"></i>
          </button>
        </NavLink>
        <NavLink to="/group">
          <button className={`nav__link ${active == "group" ? "nav__link-active" : ""}`} onClick={() => handleClick("group")}>
            <i className="fa-solid fa-user-group"></i>
          </button>
        </NavLink>
        <button
          className={`nav__link ${active == "addGroup" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("addGroup");
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </section>

      <section className="nav__bottom">
        <button
          className={`nav__link ${active == "agenda" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("agenda");
          }}
        >
          <i className="fa-regular fa-calendar"></i>
        </button>
        <button
          className={`nav__link ${active == "profile" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("profile");
          }}
        >
          <i className="fa-solid fa-user"></i>
        </button>
        <button
          className={`nav__link ${active == "settings" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("settings");
          }}
        >
          <i className="fa-solid fa-gear"></i>
        </button>
      </section>
    </nav>
  );
};

export default Nav;
