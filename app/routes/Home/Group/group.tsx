import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/home";
import Room from "~/components/Room/Room";
import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useNavigate, useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  const { typeID, convID } = useParams();
  const { isMobile } = useMobileContext();
  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);
  const [activeRoom, setActiveRoom] = useState("room1");

  const [activePath, setActivePath] = useState<string>("group1/room1");
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(typeID + "/" + activeRoom);
  }, [activeRoom]);

  useEffect(() => {
    navigate(activePath);
  }, [activePath]);

  useEffect(() => {
    !isMobile ? setDisplayMobileSideMenu(true) : "";
  }, [isMobile]);

  return (
    <div className="group" style={isMobile ? { animation: `${displayMobileSideMenu ? "openMobileSideBar" : "closeMobileSideBar"} 0.2s ease forwards` } : {}}>
      {displayMobileSideMenu && (
        <div className="group-area">
          <div className="group-area__title-container">
            <div className="group__title-area">
              <i className="fa-solid fa-house" />
              {!isMobile && <p className="group__title-area__text">Titre du groupe</p>}
            </div>
            {!isMobile && <i className="fa-solid fa-angle-down" />}
          </div>
          <div className="group-area__list">
            <Room
              roomID="room1"
              activeRoom={activeRoom}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-location-dot" />}
              roomName="Salon numéro 1"
            />
            <Room
              roomID="room2"
              activeRoom={activeRoom}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-magnifying-glass" />}
              roomName="Salon numéro 2"
            />
            <Room
              roomID="room3"
              activeRoom={activeRoom}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-video" />}
              roomName="Salon numéro 3"
            />
            <Room
              roomID="room4"
              activeRoom={activeRoom}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-lock" />}
              roomName="Salon numéro 4"
            />
            <Room
              roomID="room5"
              activeRoom={activeRoom}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-hand" />}
              roomName="Salon numéro 5"
            />
          </div>
        </div>
      )}
      <MessageArea MobileSideMenuState={displayMobileSideMenu} setMobileSideMenu={setDisplayMobileSideMenu} />
    </div>
  );
};

export default Group;
