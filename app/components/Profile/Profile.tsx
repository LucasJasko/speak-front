const Profile: React.FC<{ onClick: (selected: string) => void }> = ({ onClick }) => {
  const handleClick = (selected: string) => {
    onClick(selected);
  };
  return (
    <div className="profile">
      <div className="profile__window">
        <button className="profile__manage-button manage__button-close" onClick={() => handleClick("")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="profile__list-container">
          <ul className="profile__list">
            <li className="profile__item">Personnalisation</li>
            <li className="profile__item">Informations personnelles</li>
            <li className="profile__item">Sécurité</li>
            <li className="profile__item">Message d'absence</li>
          </ul>
        </div>
        <div className="profile__content"></div>
      </div>
    </div>
  );
};

export default Profile;
