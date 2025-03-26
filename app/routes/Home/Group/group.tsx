import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/home";
import Room from "~/components/Room/Room";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth > 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="group">
      <div className="group-area">
        <div className="group-area__title-container">
          <div className="group__title-area">
            <i className="fa-solid fa-house" />
            {isMobile && <p className="group__title-area__text">Titre du groupe</p>}
          </div>
          {isMobile && <i className="fa-solid fa-angle-down" />}
        </div>
        <div className="group-area__list">
          <Room roomIcon={<i className="fa-solid fa-location-dot" />} roomName="Salon numéro 1" />
          <Room roomIcon={<i className="fa-solid fa-magnifying-glass" />} roomName="Salon numéro 2" />
          <Room roomIcon={<i className="fa-solid fa-video" />} roomName="Salon numéro 3" />
          <Room roomIcon={<i className="fa-solid fa-lock" />} roomName="Salon numéro 4" />
          <Room roomIcon={<i className="fa-solid fa-hand" />} roomName="Salon numéro 5" />
        </div>
      </div>
      <MessageArea convID="group-message" />
    </div>
  );
};

export default Group;
