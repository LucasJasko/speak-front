import { useRef, useState, type JSX } from "react";
import { useMobileContext } from "~/context/MobileContext";
import ProfileList from "./ProfileList/ProfileList";
import { useNavigate } from "react-router";
import Customisation from "~/components/Profile/Customisation/Customisation";
import PersonnalInfos from "~/components/Profile/PersonnalInfos/PersonnalInfos";
import Security from "~/components/Profile/Security/Security";
import { AnimatePresence, motion } from "motion/react";

interface MenuMap {
  key: string;
  name: string;
  element?: JSX.Element;
}

const Profile: React.FC<{ onClose: (lastActive: string) => void; lastActive: string }> = ({ onClose, lastActive }) => {
  const navigate = useNavigate();
  const [activeProfileList, setActiveProfileList] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<any>("");
  const contentRef = useRef<JSX.Element | string>(null);
  const { isMobile } = useMobileContext();

  const menuMap: MenuMap[] = [
    { key: "personnalisation", name: "Personnalisation", element: <Customisation /> },
    { key: "personnalinfos", name: "Informations personnelles", element: <PersonnalInfos /> },
    { key: "security", name: "Sécurité", element: <Security /> },
    { key: "disconnect", name: "Déconnexion" },
  ];

  const handleClose = (lastActive: string) => {
    onClose(lastActive);
  };

  const handleActiveMenu = (key: string) => {
    setActiveMenu(key);

    const selectedItem = menuMap.find((item) => item.key == key);
    contentRef.current = selectedItem?.element || null;

    if (key === "disconnect") {
      navigate("/auth");
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
        <button className="profile__manage-button manage__button-close" onClick={() => handleClose(lastActive)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {isMobile ? (
          activeProfileList ? (
            <ProfileList
              menuMap={menuMap}
              activeMenu={activeMenu}
              onSelect={(key) => {
                handleActiveMenu(key);
                setActiveProfileList(false);
              }}
            />
          ) : (
            <span className="profile-burger" onClick={() => setActiveProfileList(true)}>
              <i className="fa-solid fa-bars"></i>
            </span>
          )
        ) : (
          <ProfileList
            menuMap={menuMap}
            activeMenu={activeMenu}
            onSelect={(key) => {
              handleActiveMenu(key);
            }}
          />
        )}
        <div className="profile__content">{contentRef.current}</div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
