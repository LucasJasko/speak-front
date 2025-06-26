import { useRef, useState, type JSX } from "react";
import Accessibility from "./Accessibility/Accessibility";
import Appearance from "./Appearance/Appearance";
import AudioVideo from "./AudioVideo/AudioVideo";
import BlockedUsers from "./BlockedUsers/BlockedUsers";
import Interface from "./Interface/Interface";
import Notifications from "./Notifications/Notifications";
import { useMobileContext } from "~/context/MobileContext";
import SettingsList from "./SettingsList/SettingsList";
import { AnimatePresence, motion } from "motion/react";
import { useSettingsContext } from "~/context/SettingsContext";
import type { profileMenuMap } from "~/interfaces/ProfileMenuMap";

const Settings = () => {
  const { lastActive, handleActiveLayout } = useSettingsContext();
  const { isMobile } = useMobileContext();

  const [activeMenu, setActiveMenu] = useState("accessibility");
  const [activeSettingsList, setActiveSettingsList] = useState<boolean>(false);

  const contentRef = useRef<JSX.Element | string>(null);

  const menuMap: profileMenuMap[] = [
    { key: "accessibility", name: "Accessibilité", element: <Accessibility /> },
    { key: "appearance", name: "Apparence", element: <Appearance /> },
    { key: "audiovideo", name: "Audio et vidéo", element: <AudioVideo /> },
    { key: "blockedusers", name: "Utilisateurs bloqués", element: <BlockedUsers /> },
    { key: "interface", name: "Interface", element: <Interface /> },
    { key: "notifications", name: "Notifications", element: <Notifications /> },
  ];

  const handleActiveMenu = (key: string) => {
    setActiveMenu(key);

    const selectedItem = menuMap.find((item) => item.key == key);
    contentRef.current = selectedItem?.element || null;
  };
  return (
    <motion.div className="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <motion.div
        className="settings__window"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <button className="settings__manage-button manage__button__close" onClick={() => handleActiveLayout(lastActive)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {isMobile ? (
          <AnimatePresence>
            {activeSettingsList ? (
              <motion.div key={activeMenu} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }} transition={{ duration: 0.2 }}>
                <SettingsList
                  menuMap={menuMap}
                  activeMenu={activeMenu}
                  onSelect={(key) => {
                    handleActiveMenu(key);
                    setActiveSettingsList(false);
                  }}
                />
              </motion.div>
            ) : (
              <span className="profile-burger" onClick={() => setActiveSettingsList(true)}>
                <i className="fa-solid fa-bars"></i>
              </span>
            )}
          </AnimatePresence>
        ) : (
          <SettingsList
            menuMap={menuMap}
            activeMenu={activeMenu}
            onSelect={(key) => {
              handleActiveMenu(key);
              setActiveSettingsList(false);
            }}
          />
        )}
        <div className="settings__content">{contentRef.current ? contentRef.current : <Notifications />}</div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
