const PersonnalInfos = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Identifiant de profil</h3>
        <p className="menu__text">C'est votre identifiant à partager aux autres utilisateurs pour vous retrouver: </p>
        <input className="menu__input" type="text" name="" id="" value="Un super ID" readOnly />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Email</h3>
        <p className="menu__text">C'est l'email dont vous vous servez pour vous connecter. Pour le modifier, merci de confirmer votre mot de passe: </p>
        <input className="menu__input" type="text" name="" id="" />
        <input className="menu__input" type="password" name="" id="" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Téléphone</h3>
        <p className="menu__text">
          Votre numéro de téléphone servira à récupérer votre compte en cas de perte ou d'oubli de vos identifiants. Celui-ci est facultatif:
        </p>
        <input className="menu__input" type="text" name="" id="" />
      </li>
    </ul>
  );
};

export default PersonnalInfos;
