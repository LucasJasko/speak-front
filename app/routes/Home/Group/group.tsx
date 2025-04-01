import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/home";
import Room from "~/components/Room/Room";
import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  const { isMobile } = useMobileContext();
  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);
  const [activeRoom, setActiveRoom] = useState("");
  const [roomId, setRoomId] = useState("");

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
              activeRoom={activeRoom}
              setRoomId={setRoomId}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-location-dot" />}
              roomName="Salon numéro 1"
            />
            <Room
              activeRoom={activeRoom}
              setRoomId={setRoomId}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-magnifying-glass" />}
              roomName="Salon numéro 2"
            />
            <Room
              activeRoom={activeRoom}
              setRoomId={setRoomId}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-video" />}
              roomName="Salon numéro 3"
            />
            <Room
              activeRoom={activeRoom}
              setRoomId={setRoomId}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-lock" />}
              roomName="Salon numéro 4"
            />
            <Room
              activeRoom={activeRoom}
              setRoomId={setRoomId}
              setActiveRoom={setActiveRoom}
              roomIcon={<i className="fa-solid fa-hand" />}
              roomName="Salon numéro 5"
            />
          </div>
        </div>
      )}
      <MessageArea activeConversation="" MobileSideMenuState={displayMobileSideMenu} setMobileSideMenu={setDisplayMobileSideMenu} />
    </div>
  );
};

export default Group;
