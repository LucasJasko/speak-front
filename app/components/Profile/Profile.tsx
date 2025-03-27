import { useEffect, useRef, useState, type JSX } from "react";
import Customisation from "./Customisation/Customisation";
import PersonnalInfos from "./PersonnalInfos/PersonnalInfos";
import Security from "./Security/Security";
import { useNavigate } from "react-router";
import { useMobileContext } from "~/context/MobileContext";

interface MenuMap {
  key: string;
  name: string;
  element?: JSX.Element;
}

const Profile: React.FC<{ onClose: (activeTab: string) => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<any>(null);
  const [activeProfileList, setActiveProfileList] = useState<boolean>(true);
  const contentRef = useRef<JSX.Element | string>(null);
  const { isMobile } = useMobileContext();

  const menuMap: MenuMap[] = [
    { key: "personnalisation", name: "Personnalisation", element: <Customisation /> },
    { key: "personnalinfos", name: "Informations personnelles", element: <PersonnalInfos /> },
    { key: "security", name: "Sécurité", element: <Security /> },
    { key: "disconnect", name: "Déconnexion" },
  ];

  const handleClose = (activeTab: string) => {
    onClose(activeTab);
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
    <div className="profile">
      <div className="profile__window">
        <button className="profile__manage-button manage__button-close" onClick={() => handleClose("")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {isMobile ? (
          activeProfileList ? (
            <div className="profile__list-container">
              <ul className="profile__list">
                {menuMap.map(({ key, name }) => (
                  <li
                    key={key}
                    className={`profile__item ${activeMenu == `${key}` ? "profile__item-active" : ""} ${
                      key == "disconnect" ? "profile__item-disconnect" : ""
                    } `}
                    onClick={() => {
                      handleActiveMenu(key), setActiveProfileList(false);
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span className="profile-burger" onClick={() => setActiveProfileList(true)}>
              <i className="fa-solid fa-bars"></i>
            </span>
          )
        ) : (
          <div className="profile__list-container">
            <ul className="profile__list">
              {menuMap.map(({ key, name }) => (
                <li
                  key={key}
                  className={`profile__item ${activeMenu == `${key}` ? "profile__item-active" : ""} ${key == "disconnect" ? "profile__item-disconnect" : ""} `}
                  onClick={() => {
                    handleActiveMenu(key);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="profile__content">{contentRef.current}</div>
      </div>
    </div>
  );
};

export default Profile;
