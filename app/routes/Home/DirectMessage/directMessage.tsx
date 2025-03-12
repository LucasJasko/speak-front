import type { Route } from "../+types/home";

import MessageInput from "~/components/MessageInput/MessageInput";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = () => {
  return (
    <div className="dm">
      <div className="contact__area">
        <div className="contact__area__search">
          <input type="search" placeholder="Rechercher un utilisateur..." />
        </div>
        <div className="contact__area__list">
          <div className="user__line">
            <div className="user__img__container">
              <img src="/assets/img/user1.png" alt="utilisateur 1" />
              <span className="connection__dot"></span>
            </div>
            <p className="user__name">Utilisateur 1</p>
          </div>
          <div className="user__line">
            <div className="user__img__container">
              <img src="/assets/img/user2.jpg" alt="utilisateur 2" />
              <span className="connection__dot"></span>
            </div>
            <p className="user__name">Utilisateur 2</p>
          </div>
          <div className="user__line">
            <div className="user__img__container">
              <img src="/assets/img/user3.jpg" alt="utilisateur 3" />
              <span className="connection__dot"></span>
            </div>
            <p className="user__name">Utilisateur 3</p>
          </div>
        </div>
      </div>
      <div className="message__area">
        <span className="dm__drag__bar"></span>
        <div className="message__feed"></div>
        <div className="message__input__area">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default DirectMessage;
