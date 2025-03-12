const Settings: React.FC<{ onClick: (selected: string) => void }> = ({ onClick }) => {
  const handleClick = (selected: string) => {
    onClick(selected);
  };
  return (
    <div className="settings">
      <div className="settings__window">
        <button className="settings__manage-button manage__button__close" onClick={() => handleClick("")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="settings__list-container">
          <ul className="settings__list">
            <li className="settings__item">Notifications</li>
            <li className="settings__item">Audio et vidéo</li>
            <li className="settings__item">Interface</li>
            <li className="settings__item">Accessibilité</li>
            <li className="settings__item">Apparence</li>
            <li className="settings__item">Utilisateurs bloqués</li>
          </ul>
        </div>
        <div className="settings__content"></div>
      </div>
    </div>
  );
};

export default Settings;
