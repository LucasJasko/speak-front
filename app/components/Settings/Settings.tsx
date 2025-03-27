import type React from "react";
import { useRef, useState, type JSX } from "react";
import Accessibility from "./Accessibility/Accessibility";
import Appearance from "./Apprearance/Appearance";
import AudioVideo from "./AudioVideo/AudioVideo";
import BlockedUsers from "./BlockedUsers/BlockedUsers";
import Interface from "./Interface/Interface";
import Notifications from "./Notifications/Notifications";
import { useMobileContext } from "~/context/MobileContext";
import SettingsList from "./SettingsList/SettingsList";

interface MenuMap {
  key: string;
  name: string;
  element?: JSX.Element;
}

const Settings: React.FC<{ onClose: (selected: string) => void; lastActive: string }> = ({ onClose, lastActive }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSettingsList, setActiveSettingsList] = useState<boolean>(true);
  const contentRef = useRef<JSX.Element | string>(null);
  const { isMobile } = useMobileContext();

  const menuMap: MenuMap[] = [
    { key: "accessibility", name: "Accessibilité", element: <Accessibility /> },
    { key: "appearance", name: "Apparence", element: <Appearance /> },
    { key: "audiovideo", name: "Audio et vidéo", element: <AudioVideo /> },
    { key: "blockedusers", name: "Utilisateurs bloqués", element: <BlockedUsers /> },
    { key: "interface", name: "Interface", element: <Interface /> },
    { key: "notifications", name: "Notifications", element: <Notifications /> },
  ];

  const handleClose = (lastActive: string) => {
    onClose(lastActive);
  };

  const handleActiveMenu = (key: string) => {
    setActiveMenu(key);

    const selectedItem = menuMap.find((item) => item.key == key);
    contentRef.current = selectedItem?.element || null;
  };
  return (
    <div className="settings">
      <div className="settings__window">
        <button className="settings__manage-button manage__button__close" onClick={() => handleClose(lastActive)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {isMobile ? (
          activeSettingsList ? (
            <SettingsList
              menuMap={menuMap}
              activeMenu={activeMenu}
              onSelect={(key) => {
                handleActiveMenu(key);
                setActiveSettingsList(false);
              }}
            />
          ) : (
            <span className="profile-burger" onClick={() => setActiveSettingsList(true)}>
              <i className="fa-solid fa-bars"></i>
            </span>
          )
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
        <div className="settings__content">{contentRef.current}</div>
      </div>
    </div>
  );
};

export default Settings;
