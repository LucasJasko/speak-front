import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/Home";
import Room from "~/components/Room/Room";
import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useNavigate, useParams } from "react-router";
import { useSettingsContext, type ProfileGroup } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  const { typeID, convID } = useParams();
  const { isMobile } = useMobileContext();
  const { accessToken } = useAuthContext();
  const { profileGroups } = useSettingsContext();
  const [groupParams, setGroupParams] = useState<ProfileGroup | undefined>(undefined);

  useEffect(() => {
    for (let i = 0; i < profileGroups.length; i++) {
      if (profileGroups[i].id == Number(typeID)) {
        setGroupParams(profileGroups[i]);
      }
    }
  }, [typeID]);

  useEffect(() => {
    if (groupParams != undefined) {
      async function fetchRooms() {
        const rooms = await useAPI("/rooms", { json: { group: groupParams?.id }, token: accessToken });
        console.log(rooms);
      }
      fetchRooms();
    }
  }, [groupParams]);

  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);

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
              <Room roomID="room1" roomIcon={<i className="fa-solid fa-location-dot" />} roomName="Salon numéro 1" />
              <Room roomID="room2" roomIcon={<i className="fa-solid fa-magnifying-glass" />} roomName="Salon numéro 2" />
              <Room roomID="room3" roomIcon={<i className="fa-solid fa-video" />} roomName="Salon numéro 3" />
              <Room roomID="room4" roomIcon={<i className="fa-solid fa-lock" />} roomName="Salon numéro 4" />
              <Room roomID="room5" roomIcon={<i className="fa-solid fa-hand" />} roomName="Salon numéro 5" />
            </div>
          </div>
        )}
        <MessageArea MobileSideMenuState={displayMobileSideMenu} setMobileSideMenu={setDisplayMobileSideMenu} />
      </div>
    );
  }
};

export default Group;
