import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMobileContext } from "~/context/MobileContext";
import { useNavigate } from "react-router";
import { useSettingsContext } from "~/context/SettingsContext";

const Nav: React.FC<{ onClick: (selected: string) => void; activeBtn: string }> = ({ onClick, activeBtn }) => {
  const navigate = useNavigate();
  const { picture, b64Picture, profileGroups, fetchGroupPicture } = useSettingsContext();
  const { isMobile } = useMobileContext();
  const [activeArrow, setActiveArrow] = useState(false);
  const [groupPictures, setGroupPictures] = useState<Record<string, string>>({});
  const handleActiveBtn = (selectedBtn: string) => {
    onClick(selectedBtn);
  };

  useEffect(() => {
    if (profileGroups.length > 1) {
      console.log(profileGroups);
      const fetchPictures = () => {
        profileGroups.map(async (group) => {
          const b64picture = await fetchGroupPicture({
            id: group.id,
            name: group.name,
            picture: group.picture,
          });
          console.log(b64Picture);
          // setGroupPictures(pictures); // ← Active cette ligne si tu veux stocker les résultats
        });
      };

      fetchPictures();
    }
  }, [profileGroups]);

  const handleActiveArrow = () => {
    activeArrow ? setActiveArrow(false) : setActiveArrow(true);
  };

  return (
    <nav className="nav">
      <section className="nav__top">
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.001 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`nav__link ${activeBtn == "direct-message" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleActiveBtn("direct-message");
            navigate("dm/0");
          }}
        >
          <i className="fa-regular fa-comments" />
        </motion.button>
        {profileGroups &&
          profileGroups.map((group) => (
            <motion.button
              key={group.id}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.001 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`nav__link ${activeBtn == "group" ? "nav__link-active" : ""}`}
              onClick={() => {
                handleActiveBtn("group");
                navigate(`${group.name}/123`);
              }}
            >
              {picture ? <img src={`data:image/jpeg;base64,${b64Picture}`} /> : <i className="fa-solid fa-user-group" />}
            </motion.button>
          ))}

        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.001 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`nav__link ${activeBtn == "addGroup" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleActiveBtn("addGroup");
          }}
        >
          <i className="fa-solid fa-plus" />
        </motion.button>
      </section>

      {isMobile ? (
        <button className="mobile-deploy-button" onClick={handleActiveArrow}>
          <motion.i animate={{ rotate: activeArrow ? 0 : 180 }} transition={{ ease: "easeOut" }} className="fa-solid fa-angle-down" />
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
                    transition: { duration: 0.001 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav__link nav__bottom-mobile__link ${activeBtn == "agenda" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleActiveBtn("agenda");
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
                    transition: { duration: 0.001 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav__link nav__bottom-mobile__link ${activeBtn == "profile" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleActiveBtn("profile");
                  }}
                >
                  {picture ? <img src={`data:image/jpeg;base64,${b64Picture}`} /> : <i className="fa-solid fa-user" />}
                </motion.button>
                <motion.button
                  key="mobile"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.001 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav__link nav__bottom-mobile__link ${activeBtn == "settings" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleActiveBtn("settings");
                  }}
                >
                  <i className="fa-solid fa-gear" />
                </motion.button>
              </section>
            ) : (
              ""
            )}
          </AnimatePresence>
        </button>
      ) : (
        <section className="nav__bottom">
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.001 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`nav__link ${activeBtn == "agenda" ? "nav__link-active" : ""}`}
            onClick={() => {
              handleActiveBtn("agenda");
            }}
          >
            <i className="fa-regular fa-calendar" />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.001 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`nav__link ${activeBtn == "profile" ? "nav__link-active" : ""}`}
            onClick={() => {
              handleActiveBtn("profile");
            }}
          >
            {picture ? <img src={`data:image/jpeg;base64,${b64Picture}`} /> : <i className="fa-solid fa-user" />}
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.001 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`nav__link ${activeBtn == "settings" ? "nav__link-active" : ""}`}
            onClick={() => {
              handleActiveBtn("settings");
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
