import React from "react";

const BlockedUsers = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Utilisateurs bloqués</h3>
        <p className="menu__text">Voici la liste des utilisateurs que vous avez bloqué: </p>
        <ul className="blocked-user__list">
          <li className="blocked-user__item">User 1</li>
          <li className="blocked-user__item">User 2</li>
          <li className="blocked-user__item">User 3</li>
          <li className="blocked-user__item">User 4</li>
        </ul>
      </li>
    </ul>
  );
};

export default BlockedUsers;
