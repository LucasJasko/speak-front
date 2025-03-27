const Notifications = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Statut des notifications</h3>
        <p className="menu__text">Décidez d'activer ou désactiver les notification sur Alert MNS: </p> <br />
        <label className="notif-state-label" htmlFor="active">
          Activées
        </label>
        <input className="menu__input" type="radio" name="notif-state" id="active" /> <br />
        <label className="notif-state-label" htmlFor="unactive">
          Désactivées
        </label>
        <input className="menu__input" type="radio" name="notif-state" id="unactive" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Mise en sourdine des notifications</h3>
        <p className="menu__text">Vous continuerez à recevoir des notifications mais sans alerte audio: </p> <br />
        <label htmlFor="notif-mute">Mettre en sourdine</label>
        <input className="menu__input notif-mute-checkbox" type="checkbox" name="" id="notif-mute" />
      </li>
    </ul>
  );
};

export default Notifications;
