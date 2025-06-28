const BlockedUsers = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Utilisateurs bloqués</h3>
        <p className="menu__text">Voici la liste des utilisateurs que vous avez bloqué: </p>
        <ul className="blocked-user__list">
          <li className="blocked-user__item">
            <p>Cette fonctionnalité n'est pas encore disponible</p> <i className="fa-solid fa-xmark"></i>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default BlockedUsers;
