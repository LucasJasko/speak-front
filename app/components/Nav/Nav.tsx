import { useState } from "react";
import NavButton from "../NavButton/NavButton";
import { NavLink } from "react-router";

const Nav = () => {
  return (
    <nav className="nav">
      <section className="nav__top">
        <NavLink to="direct-message">
          <NavButton buttonClass="nav__link__direct-message">
            <i className="fa-regular fa-comments"></i>
          </NavButton>
        </NavLink>
        <NavLink to="group">
          <NavButton buttonClass="nav__link__group">
            <i className="fa-solid fa-user-group"></i>
          </NavButton>
        </NavLink>
        <NavButton buttonClass="nav__link__add">
          <i className="fa-solid fa-plus"></i>
        </NavButton>
      </section>
      <section className="nav__bottom">
        <NavLink to="agenda">
          <NavButton buttonClass="nav__link__agenda">
            <i className="fa-regular fa-calendar"></i>
          </NavButton>
        </NavLink>
        <NavButton buttonClass="nav__link__profile">
          <i className="fa-solid fa-user"></i>
        </NavButton>
        <NavButton buttonClass="nav__link__settings">
          <i className="fa-solid fa-gear"></i>
        </NavButton>
      </section>
    </nav>
  );
};

export default Nav;
