import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/home";
import Room from "~/components/Room/Room";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  return (
    <div className="group">
      <div className="group-area">
        <div className="group-area__title-container">
          <div className="group__title-area">
            <i className="fa-solid fa-house"></i>
            <p className="group__title-area__text">Titre du groupe</p>
          </div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className="group-area__list">
          <Room roomIcon={<i className="fa-solid fa-location-dot"></i>} roomName="Salon numéro 1" />
          <Room roomIcon={<i className="fa-solid fa-magnifying-glass"></i>} roomName="Salon numéro 2" />
          <Room roomIcon={<i className="fa-solid fa-video"></i>} roomName="Salon numéro 3" />
          <Room roomIcon={<i className="fa-solid fa-lock"></i>} roomName="Salon numéro 4" />
          <Room roomIcon={<i className="fa-solid fa-hand"></i>} roomName="Salon numéro 5" />
        </div>
      </div>
      <MessageArea convID="group-message" />
    </div>
  );
};

export default Group;
