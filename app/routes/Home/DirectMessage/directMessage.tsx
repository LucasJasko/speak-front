import UserItem from "~/components/UserItem/UserItem";
import type { Route } from "../+types/home";

import MessageArea from "~/components/MessageArea/MessageArea";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = () => {
  return (
    <div className="direct-message">
      <div className="contact-area">
        <div className="contact-area__search">
          <input type="search" placeholder="Rechercher un utilisateur..." />
        </div>
        <div className="contact-area__list">
          <UserItem name="Utilisateur 1" pic="/assets/img/user1.png" status={true} />
          <UserItem name="Utilisateur 2" pic="/assets/img/user2.jpg" status={true} />
          <UserItem name="Utilisateur 3" pic="/assets/img/user3.jpg" status={true} />
        </div>
      </div>
      <MessageArea />
    </div>
  );
};

export default DirectMessage;
