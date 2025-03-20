import { useState, type JSX } from "react";
import Customisation from "./Customisation/Customisation";
import PersonnalInfos from "./PersonnalInfos/PersonnalInfos";
import Security from "./Security/Security";
import AFKmessage from "./AFKmessage/AFKmessage";

const Profile: React.FC<{ onClick: (selected: string) => void }> = ({ onClick }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleClick = (selected: string) => {
    onClick(selected);
  };

  const menuMap: Record<string, JSX.Element> = {
    personnalisation: <Customisation />,
    personnalinfos: <PersonnalInfos />,
    security: <Security />,
    afkmessage: <AFKmessage />,
  };

  return (
    <div className="profile">
      <div className="profile__window">
        <button className="profile__manage-button manage__button-close" onClick={() => handleClick("")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="profile__list-container">
          <ul className="profile__list">
            <li
              className={`profile__item ${activeMenu == "personnalisation" ? "profile__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("personnalisation");
              }}
            >
              Personnalisation
            </li>
            <li
              className={`profile__item ${activeMenu == "personnalinfos" ? "profile__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("personnalinfos");
              }}
            >
              Informations personnelles
            </li>
            <li
              className={`profile__item ${activeMenu == "security" ? "profile__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("security");
              }}
            >
              Sécurité
            </li>
            <li
              className={`profile__item ${activeMenu == "afkmessage" ? "profile__item-active" : ""}`}
              onClick={() => {
                setActiveMenu("afkmessage");
              }}
            >
              Message d'absence
            </li>
          </ul>
        </div>
        <div className="profile__content">{menuMap[activeMenu]}</div>
      </div>
    </div>
  );
};

export default Profile;
