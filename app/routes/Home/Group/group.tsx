import MessageArea from "~/components/MessageArea/MessageArea";
import type { Route } from "../+types/home";

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
        <div className="group-area__list"></div>
      </div>
      <MessageArea />
    </div>
  );
};

export default Group;
