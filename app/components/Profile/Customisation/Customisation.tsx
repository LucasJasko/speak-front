const Customisation = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Photo de profil</h3>
        <div>
          <p className="menu__text">Modifiez votre photo de profil:</p>
          <input className="menu__input input-file" type="file" name="" id="" />
        </div>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Statut d'activité</h3>
        <p className="menu__text">Choisissez votre statut actuel:</p>
        <select className="menu__input" name="" id="">
          <option value="">En ligne</option>
          <option value="">Absent</option>
          <option value="">Occupé</option>
          <option value="">Invisible</option>
        </select>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Nom d'utilisateur</h3>
        <p className="menu__text">Votre nom d'utilisateur (pseudo) qui sera visible par les autres utilisateurs:</p>
        <input className="menu__input" type="text" name="" id="" placeholder="Votre nom d'utilisateur" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Biographie</h3>
        <p className="menu__text">Le message qui sera visible sur votre profil:</p>
        <input className="menu__input" type="text" name="" id="" placeholder="Votre biographie" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Message d'absence</h3>
        <p className="menu__text">
          Vous pouvez définir un message d'absence. Celui-ci sera envoyé à tout utilisateur souhaitant vous envoyer un message direct pendant la période
          définie:
        </p>
        <input className="menu__input" type="text" name="" id="" placeholder="Votre message" />
        <div className="menu__wrapper">
          <p className="menu__text">Du:</p>
          <input className="menu__input" type="date" name="" id="" />
          <p className="menu__text">Au:</p>
          <input className="menu__input" type="date" name="" id="" />
        </div>
      </li>
    </ul>
  );
};

export default Customisation;
