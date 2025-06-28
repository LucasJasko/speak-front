const Interface = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Disposition des messages</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <p className="menu__text">Choisissez l'espacement des messages de vos fils de conversations: </p>
          </div>
          <div className="menu__body__right">
            <select className="menu__select" name="disposition" disabled>
              <option value="1">---</option>
              <option value="2">disposition 2</option>
              <option value="3">disposition 3</option>
            </select>
          </div>
        </div>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Réactions rapides</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <p className="menu__text react-menu__text">Choisissez les réactions rapide disponibles sur les messages: </p> <br />
          </div>
          <div className="menu__body__right">
            <select className="menu__select" name="react1" disabled>
              <option value="">---</option>
              <option value="1">content</option>
              <option value="2">pouce en l'air</option>
            </select>
            <select className="menu__select" name="react2" disabled>
              <option value="">---</option>
              <option value="1">pas content</option>
              <option value="2">validé</option>
            </select>
            <select className="menu__select" name="react3" disabled>
              <option value="">---</option>
              <option value="1">liste d'emoji</option>
              <option value="2">...</option>
            </select>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Interface;
