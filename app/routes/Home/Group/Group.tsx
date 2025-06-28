import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/Home";
import Room from "~/components/Room/Room";
import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useSettingsContext } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "~/context/AuthContext";
import { useSocketContext } from "~/context/SocketContext";
import type { ProfileGroup } from "~/interfaces/ProfileGroup";
import type { RoomProps } from "~/interfaces/RoomProps";
import type { messageContent } from "~/interfaces/MessageContent";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  const { typeID, convID } = useParams();
  const { isMobile } = useMobileContext();
  const { accessToken, id } = useAuthContext();
  const { profileGroups } = useSettingsContext();
  const { socketRef } = useSocketContext();

  const [groupParams, setGroupParams] = useState<ProfileGroup | undefined>(undefined);
  const [rooms, setRooms] = useState<RoomProps[]>([]);
  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);

  useEffect(() => {
    for (let i = 0; i < profileGroups.length; i++) {
      if (profileGroups[i].id == Number(typeID)) {
        setGroupParams(profileGroups[i]);
      }
    }
  }, [typeID]);

  useEffect(() => {
    async function fetchRooms() {
      if (groupParams != undefined) {
        const res = await useAPI<RoomProps[]>("/rooms", { json: { group: groupParams.id }, token: accessToken });
        setRooms(res.data);
      }
    }
    fetchRooms();
  }, [groupParams]);

  useEffect(() => {
    if (!socketRef?.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    const message: messageContent = {
      messageHeaders: {
        isForGroup: true,
        date: Date.now().toString(),
        type: "switch",
        sender: id?.toString(),
        target: convID,
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

  if (groupParams != undefined) {
    return (
      <div className="group" style={isMobile ? { animation: `${displayMobileSideMenu ? "openMobileSideBar" : "closeMobileSideBar"} 0.2s ease forwards` } : {}}>
        {displayMobileSideMenu && (
          <div className="group-area">
            <div className="group-area__title-container">
              <div className="group__title-area">
                <i className="fa-solid fa-house" />
                {!isMobile && <p className="group__title-area__text">{groupParams.name}</p>}
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
  }
};

export default Group;
