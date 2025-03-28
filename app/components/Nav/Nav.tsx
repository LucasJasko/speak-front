import React, { useState } from "react";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMobileContext } from "~/context/MobileContext";

const Nav: React.FC<{ onClick: (selected: string) => void; activeBtn: string }> = ({ onClick, activeBtn }) => {
  const { isMobile } = useMobileContext();
  const [activeArrow, setActiveArrow] = useState(false);
  const handleClick = (selectedBtn: string) => {
    onClick(selectedBtn);
  };

  const handleActiveArrow = () => {
    activeArrow ? setActiveArrow(false) : setActiveArrow(true);
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
            <i className="fa-regular fa-comments" />
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
            <i className="fa-solid fa-user-group" />
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
          <i className="fa-solid fa-plus" />
        </motion.button>
      </section>

      {isMobile ? (
        <div className="mobile-deploy-button" onClick={handleActiveArrow}>
          <motion.i animate={{ rotate: activeArrow ? 180 : 0 }} transition={{ ease: "easeOut" }} className="fa-solid fa-angle-down" />
          <AnimatePresence>
            {activeArrow ? (
              <section className="nav__bottom-mobile">
                <motion.button
                  key="agenda"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav__link nav__bottom-mobile__link ${activeBtn == "agenda" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleClick("agenda");
                  }}
                >
                  <i className="fa-regular fa-calendar" />
                </motion.button>
                <motion.button
                  key="profile"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav__link nav__bottom-mobile__link ${activeBtn == "profile" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleClick("profile");
                  }}
                >
                  <i className="fa-solid fa-user" />
                </motion.button>
                <motion.button
                  key="mobile"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav__link nav__bottom-mobile__link ${activeBtn == "settings" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleClick("settings");
                  }}
                >
                  <i className="fa-solid fa-gear" />
                </motion.button>
              </section>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      ) : (
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
            <i className="fa-regular fa-calendar" />
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
            <i className="fa-solid fa-user" />
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
            <i className="fa-solid fa-gear" />
          </motion.button>
        </section>
      )}
    </nav>
  );
};

export default Nav;
