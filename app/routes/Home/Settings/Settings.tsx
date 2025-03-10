const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__window">
        <button className="manage__button manage__button__close">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="settings__list">
          <ul>
            <li>Notifications</li>
            <li>Audio et vidéo</li>
            <li>Interface</li>
            <li>Accessibilité</li>
            <li>Apparence</li>
            <li>Utilisateurs bloqués</li>
          </ul>
        </div>
        <div className="settings__content"></div>
      </div>
    </div>
  );
};

export default Settings;
