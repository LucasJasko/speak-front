import React, { useState } from "react";
import { NavLink } from "react-router";
import { motion } from "motion/react";

const Nav: React.FC<{ onClick: (selected: string) => void; activeBtn: string }> = ({ onClick, activeBtn }) => {
  const handleClick = (selectedBtn: string) => {
    onClick(selectedBtn);
  };

  return (
    <nav className="nav">
      <section className="nav__top">
        <NavLink to="direct-message">
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`nav__link ${activeBtn == "direct-message" ? "nav__link-active" : ""}`}
            onClick={() => handleClick("direct-message")}
          >
            <i className="fa-regular fa-comments"></i>
          </motion.button>
        </NavLink>
        <NavLink to="group">
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`nav__link ${activeBtn == "group" ? "nav__link-active" : ""}`}
            onClick={() => handleClick("group")}
          >
            <i className="fa-solid fa-user-group"></i>
          </motion.button>
        </NavLink>
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`nav__link ${activeBtn == "addGroup" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("addGroup");
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </motion.button>
      </section>

      <section className="nav__bottom">
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`nav__link ${activeBtn == "agenda" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("agenda");
          }}
        >
          <i className="fa-regular fa-calendar"></i>
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`nav__link ${activeBtn == "profile" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("profile");
          }}
        >
          <i className="fa-solid fa-user"></i>
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`nav__link ${activeBtn == "settings" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleClick("settings");
          }}
        >
          <i className="fa-solid fa-gear"></i>
        </motion.button>
      </section>
    </nav>
  );
};

export default Nav;
