import { useRef, useState, type JSX } from "react";
import { useMobileContext } from "~/context/MobileContext";
import ProfileList from "./ProfileList/ProfileList";
import { useNavigate } from "react-router";
import Customisation from "~/components/Profile/Customisation/Customisation";
import PersonnalInfos from "~/components/Profile/PersonnalInfos/PersonnalInfos";
import Security from "~/components/Profile/Security/Security";
import { AnimatePresence, motion } from "motion/react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "~/context/AuthContext";
import { useSettingsContext } from "~/context/SettingsContext";
import type { profileMenuMap } from "~/interfaces/ProfileMenuMap";

const Profile = () => {
  const navigate = useNavigate();

  const { id, accessToken } = useAuthContext();
  const { isMobile } = useMobileContext();
  const { lastActive, handleActiveLayout } = useSettingsContext();

  const [activeProfileList, setActiveProfileList] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<any>("personnalisation");

  const contentRef = useRef<JSX.Element | string>(null);

  const menuMap: profileMenuMap[] = [
    { key: "personnalisation", name: "Personnalisation", element: <Customisation /> },
    { key: "personnalinfos", name: "Informations personnelles", element: <PersonnalInfos /> },
    { key: "security", name: "Sécurité", element: <Security /> },
    { key: "disconnect", name: "Déconnexion" },
  ];

  const handleActiveMenu = async (key: string) => {
    setActiveMenu(key);

    const selectedItem = menuMap.find((item) => item.key == key);
    contentRef.current = selectedItem?.element || null;

    if (key === "disconnect") {
      const res = await useAPI("/logout/" + id, { token: accessToken });
      if (res.status === 200) {
        window.location.href = "/loader";
        navigate("/auth");
      }
    }
  };

  return (
    <motion.div className="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <motion.div
        className="profile__window"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <button className="profile__manage-button manage__button-close" onClick={() => handleActiveLayout(lastActive)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {isMobile ? (
          <AnimatePresence>
            {activeProfileList ? (
              <motion.div key={activeMenu} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }} transition={{ duration: 0.2 }}>
                <ProfileList
                  menuMap={menuMap}
                  activeMenu={activeMenu}
                  onSelect={(key) => {
                    handleActiveMenu(key);
                    setActiveProfileList(false);
                  }}
                />
              </motion.div>
            ) : (
              <span className="profile-burger" onClick={() => setActiveProfileList(true)}>
                <i className="fa-solid fa-bars"></i>
              </span>
            )}
          </AnimatePresence>
        ) : (
          <ProfileList
            menuMap={menuMap}
            activeMenu={activeMenu}
            onSelect={(key) => {
              handleActiveMenu(key);
            }}
          />
        )}
        <div className="profile__content">{contentRef.current ? contentRef.current : <Customisation />}</div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
