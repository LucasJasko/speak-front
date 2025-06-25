import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMobileContext } from "~/context/MobileContext";
import { useNavigate } from "react-router";
import { useSettingsContext } from "~/context/SettingsContext";

const Nav = () => {
  const navigate = useNavigate();

  const { picture, b64Picture, profileGroups, activeLayout, handleActiveLayout, setProfileGroups, fetchGroupPicture } = useSettingsContext();
  const { isMobile } = useMobileContext();

  const [activeArrow, setActiveArrow] = useState(false);
  const [isGroupPictureApplied, setIsGroupPictureApplied] = useState(false);

  useEffect(() => {
    if (!isGroupPictureApplied && profileGroups.length > 0) {
      const fetchPictures = async () => {
        const updatedGroups = await Promise.all(
          profileGroups.map(async (group) => {
            const b64groupPicture = await fetchGroupPicture({
              id: group.id,
              name: group.picture.replace(".webp", "").replace("speak-group-", ""),
              picture: group.picture,
            });
            if (b64groupPicture) {
              return {
                ...group,
                picture: b64groupPicture,
              };
            } else {
              return group;
            }
          })
        );
        setProfileGroups(updatedGroups);
        setIsGroupPictureApplied(true);
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
          className={`nav__link ${activeLayout == "direct-message" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleActiveLayout("direct-message");
            navigate("/home/dm/0");
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
              className={`nav__link ${activeLayout == `group-${group.id}` ? "nav__link-active" : ""}`}
              onClick={() => {
                handleActiveLayout(`group-${group.id}`);
                navigate(`/home/${group.id}/0`);
              }}
            >
              {group.picture ? <img src={`data:image/jpeg;base64,${group.picture}`} /> : <i className="fa-solid fa-user-group" />}
            </motion.button>
          ))}

        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.001 },
          }}
          whileTap={{ scale: 0.95 }}
          className={`nav__link ${activeLayout == "addGroup" ? "nav__link-active" : ""}`}
          onClick={() => {
            handleActiveLayout("addGroup");
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
                  className={`nav__link nav__bottom-mobile__link ${activeLayout == "agenda" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleActiveLayout("agenda");
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
                  className={`nav__link nav__bottom-mobile__link ${activeLayout == "profile" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleActiveLayout("profile");
                  }}
                >
                  {picture ? <img src={`data:image/webp;base64,${b64Picture}`} /> : <i className="fa-solid fa-user" />}
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
                  className={`nav__link nav__bottom-mobile__link ${activeLayout == "settings" ? "nav__link-active" : ""}`}
                  onClick={() => {
                    handleActiveLayout("settings");
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
            className={`nav__link ${activeLayout == "agenda" ? "nav__link-active" : ""}`}
            onClick={() => {
              handleActiveLayout("agenda");
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
            className={`nav__link ${activeLayout == "profile" ? "nav__link-active" : ""}`}
            onClick={() => {
              handleActiveLayout("profile");
            }}
          >
            {picture ? <img src={`data:image/webp;base64,${b64Picture}`} /> : <i className="fa-solid fa-user" />}
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.001 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`nav__link ${activeLayout == "settings" ? "nav__link-active" : ""}`}
            onClick={() => {
              handleActiveLayout("settings");
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
