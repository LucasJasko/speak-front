import type React from "react";
import { useState, type JSX } from "react";
import Accessibility from "./Accessibility/Accessibility";
import Appearance from "./Apprearance/Appearance";
import AudioVideo from "./AudioVideo/AudioVideo";
import BlockedUsers from "./BlockedUsers/BlockedUsers";
import Interface from "./Interface/Interface";
import Notifications from "./Notifications/Notifications";

const Settings: React.FC<{ onClick: (selected: string) => void }> = ({ onClick }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const menuMap: Record<string, JSX.Element> = {
    accessibility: <Accessibility />,
    appearance: <Appearance />,
    audiovideo: <AudioVideo />,
    blockedusers: <BlockedUsers />,
    interface: <Interface />,
    notifications: <Notifications />,
  };

  const handleClick = (selected: string) => {
    onClick(selected);
  };
  return (
    <div className="settings">
      <div className="settings__window">
        <button className="settings__manage-button manage__button__close" onClick={() => handleClick("")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="settings__list-container">
          <ul className="settings__list">
            <li
              className={`settings__item ${activeMenu == "notifications" ? "settings__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("notifications");
              }}
            >
              Notifications
            </li>
            <li
              className={`settings__item ${activeMenu == "audiovideo" ? "settings__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("audiovideo");
              }}
            >
              Audio et vidéo
            </li>
            <li
              className={`settings__item ${activeMenu == "interface" ? "settings__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("interface");
              }}
            >
              Interface
            </li>
            <li
              className={`settings__item ${activeMenu == "accessibility" ? "settings__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("accessibility");
              }}
            >
              Accessibilité
            </li>
            <li
              className={`settings__item ${activeMenu == "appearance" ? "settings__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("appearance");
              }}
            >
              Apparence
            </li>
            <li
              className={`settings__item ${activeMenu == "blockedusers" ? "settings__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("blockedusers");
              }}
            >
              Utilisateurs bloqués
            </li>
          </ul>
        </div>
        <div className="settings__content">{menuMap[activeMenu]}</div>
      </div>
    </div>
  );
};

export default Settings;
