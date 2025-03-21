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

  const menuMap: Record<string, JSX.Element | [string, JSX.Element]> = {
    accessibility: ["Accessibilité", <Accessibility />],
    appearance: ["Apparence", <Appearance />],
    audiovideo: ["Audio et vidéo", <AudioVideo />],
    blockedusers: ["Utilisateurs bloqués", <BlockedUsers />],
    interface: ["Interface", <Interface />],
    notifications: ["Notifications", <Notifications />],
  };
  const activeList = menuMap[activeMenu];
  const menuItem = Array.isArray(activeList) ? activeList[1] : activeList;

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
            {Object.entries(menuMap).map(([key, value]) => (
              <li
                key={key}
                className={`settings__item ${activeMenu == `${key}` ? "settings__item-active" : ""}`}
                onClick={() => {
                  setActiveMenu(`${key}`);
                }}
              >
                {Array.isArray(value) ? value[0] : ""}
              </li>
            ))}
          </ul>
        </div>
        <div className="settings__content">{menuItem}</div>
      </div>
    </div>
  );
};

export default Settings;
