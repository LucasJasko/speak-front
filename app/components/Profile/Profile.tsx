const Profile: React.FC<{ onClick: (selected: string) => void }> = ({ onClick }) => {
  const handleClick = (selected: string) => {
    onClick(selected);
  };
  return (
    <div className="profile">
      <div className="profile__window">
        <button className="manage__button manage__button__close" onClick={() => handleClick("")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="profile__list">
          <ul>
            <li>Personnalisation</li>
            <li>Informations personnelles</li>
            <li>Sécurité</li>
            <li>Message d'absence</li>
          </ul>
        </div>
        <div className="profile__content"></div>
      </div>
    </div>
  );
};

export default Profile;
