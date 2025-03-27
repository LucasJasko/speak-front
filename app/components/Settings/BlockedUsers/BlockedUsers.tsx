import React from "react";

const BlockedUsers = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Utilisateurs bloqués</h3>
        <p className="menu__text">Voici la liste des utilisateurs que vous avez bloqué: </p>
        <ul className="blocked-user__list">
          <li className="blocked-user__item">
            <p>User 1</p> <i className="fa-solid fa-xmark"></i>
          </li>
          <li className="blocked-user__item">
            <p>User 2</p> <i className="fa-solid fa-xmark"></i>
          </li>
          <li className="blocked-user__item">
            <p>User 3</p> <i className="fa-solid fa-xmark"></i>
          </li>
          <li className="blocked-user__item">
            <p>User 4</p> <i className="fa-solid fa-xmark"></i>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default BlockedUsers;
