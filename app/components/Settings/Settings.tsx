import type React from "react";
import { useRef, useState, type JSX } from "react";
import Accessibility from "./Accessibility/Accessibility";
import Appearance from "./Apprearance/Appearance";
import AudioVideo from "./AudioVideo/AudioVideo";
import BlockedUsers from "./BlockedUsers/BlockedUsers";
import Interface from "./Interface/Interface";
import Notifications from "./Notifications/Notifications";
import { useMobileContext } from "~/context/MobileContext";

interface MenuMap {
  key: string;
  name: string;
  element?: JSX.Element;
}

const Settings: React.FC<{ onClose: (selected: string) => void }> = ({ onClose }) => {
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
  const handleClose = (activeTab: string) => {
    onClose(activeTab);
  };

  const handleActiveMenu = (key: string) => {
    setActiveMenu(key);

    const selectedItem = menuMap.find((item) => item.key == key);
    contentRef.current = selectedItem?.element || null;
  };
  return (
    <div className="settings">
      <div className="settings__window">
        <button className="settings__manage-button manage__button__close" onClick={() => handleClose("")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {isMobile ? (
          activeSettingsList ? (
            <div className="settings__list-container">
              <ul className="settings__list">
                {menuMap.map(({ key, name }) => (
                  <li
                    key={key}
                    className={`settings__item ${activeMenu == `${key}` ? "settings__item-active" : ""}`}
                    onClick={() => {
                      handleActiveMenu(key), setActiveSettingsList(false);
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span className="profile-burger" onClick={() => setActiveSettingsList(true)}>
              <i className="fa-solid fa-bars"></i>
            </span>
          )
        ) : (
          <div className="settings__list-container">
            <ul className="settings__list">
              {menuMap.map(({ key, name }) => (
                <li
                  key={key}
                  className={`settings__item ${activeMenu == `${key}` ? "settings__item-active" : ""}`}
                  onClick={() => {
                    setActiveMenu(`${key}`);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="settings__content">{contentRef.current}</div>
      </div>
    </div>
  );
};

export default Settings;
