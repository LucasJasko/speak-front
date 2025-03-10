import type { Route } from "../+types/main";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Groupes" }, { name: "description", content: "Ce sont vos groupes" }];
}

const Group = () => {
  return (
    <div className="group">
      <div className="contact__area">
        <div className="group__title__container">
          <div className="group__title">
            <i className="fa-solid fa-house"></i>
            <p className="group__title__text">Titre du groupe</p>
          </div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className="contact__area__list"></div>
      </div>
      <div className="message__area">
        <span className="dm__drag__bar"></span>
        <div className="message__feed"></div>
        <div className="message__input__area">
          <div className="message__input">
            <input type="text" name="message" placeholder="Entrez votre message..." />
            <div className="message__link__container">
              <i className="fa-solid fa-file-arrow-up"></i>
              <i className="fa-solid fa-code"></i>
              <i className="fa-solid fa-calendar-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
