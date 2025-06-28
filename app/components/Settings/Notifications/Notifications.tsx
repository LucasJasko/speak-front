const Notifications = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Statut des notifications</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <p className="menu__text">Décidez d'activer ou désactiver les notification sur Alert MNS: </p> <br />
          </div>
          <div className="menu__body__right">
            <label className="notif-state-label" htmlFor="active">
              Activer
            </label>
            <input className="menu__input" type="radio" name="notif-state" id="active" disabled /> <br />
            <label className="notif-state-label" htmlFor="unactive">
              Désactiver
            </label>
            <input className="menu__input" type="radio" name="notif-state" id="unactive" disabled />
          </div>
        </div>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Mise en sourdine des notifications</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <p className="menu__text">Vous continuerez à recevoir des notifications mais sans alerte audio: </p>
          </div>
          <div className="menu__body__right">
            <label htmlFor="notif-mute">Mettre en sourdine</label>
            <input className="menu__input notif-mute-checkbox" type="checkbox" name="notif-mute" id="notif-mute" disabled />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Notifications;
