import React from "react";

const Interface = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Disposition des messages</h3>
        <p className="menu__text">Choisissez l'espacement des messages de vos fils de conversations: </p>
        <select name="" id="">
          <option value="1">disposition 1</option>
          <option value="2">disposition 2</option>
          <option value="3">disposition 3</option>
        </select>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Réactions rapides</h3>
        <p className="menu__text">Choisissez les réactions rapide disponibles sur les messages: </p>
        <select name="" id="">
          <option value="">Réaction 1</option>
          <option value="1">content</option>
          <option value="2">pouce en l'air</option>
        </select>
        <select name="" id="">
          <option value="">Réaction 2</option>
          <option value="1">pas content</option>
          <option value="2">validé</option>
        </select>
        <select name="" id="">
          <option value="">Réaction 3</option>
          <option value="1">liste d'emoji</option>
          <option value="2">...</option>
        </select>
      </li>
    </ul>
  );
};

export default Interface;
