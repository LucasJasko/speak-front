import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/Home";
import Room from "~/components/Room/Room";
import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { useSocketContext } from "~/context/SocketContext";
import type { messageContent } from "~/interfaces/MessageContent";
import { useConvContext } from "~/context/ConvContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  const { typeID, convID } = useParams();
  const { isMobile } = useMobileContext();
  const { id } = useAuthContext();
  const { socketRef } = useSocketContext();
  const { groupParams, rooms } = useConvContext();

  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);

  useEffect(() => {
    if (!socketRef?.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    const message: messageContent = {
      messageHeaders: {
        isForGroup: true,
        date: Date.now().toString(),
        type: "switch",
        sender: id,
        target: convID ? parseInt(convID, 10) : undefined,
      },
      messageBody: {},
    };

    if (convID != "0") {
      socketRef.current.send(JSON.stringify(message));
    }

    if (isMobile) {
      setDisplayMobileSideMenu(false);
    }
  }, [convID]);

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
              {!isMobile && <p className="group__title-area__text">{groupParams && groupParams.name}</p>}
            </div>
            {!isMobile && <i className="fa-solid fa-angle-down" />}
          </div>
          <div className="group-area__list">
            {rooms &&
              rooms.map((room) => (
                <Room
                  key={room.id}
                  id={room.id}
                  icon={<i className="fa-solid fa-location-dot" />}
                  name={room.name}
                  groupID={room.groupID}
                  onClick={setDisplayMobileSideMenu}
                />
              ))}
          </div>
        </div>
      )}
      <MessageArea MobileSideMenuState={displayMobileSideMenu} setMobileSideMenu={setDisplayMobileSideMenu} />
    </div>
  );
};

export default Group;
