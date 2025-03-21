const Security = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Mot de passe</h3>
        <p className="menu__text">Vous pouvez modifier votre mot de passe ici:</p>
        <input className="menu__input" type="password" name="" id="" placeholder="Ancien mot de passe" />
        <input className="menu__input" type="password" name="" id="" placeholder="Nouveau mot de passe" />
        <input className="menu__input" type="password" name="" id="" placeholder="Confirmer votre nouveau mot de passe" />
      </li>
    </ul>
  );
};

export default Security;
