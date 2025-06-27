import { useAuthContext } from "~/context/AuthContext";

const PersonnalInfos = () => {
  const { id } = useAuthContext();

  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Identifiant de profil</h3>
        <p className="menu__text">C'est votre identifiant à partager aux autres utilisateurs pour vous retrouver: </p>
        <input className="menu__input menu__input-half" type="text" name="" id="userid" value={id?.toString()} readOnly />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Email</h3>
        <p className="menu__text">C'est l'email dont vous vous servez pour vous connecter. Pour le modifier, merci de confirmer votre mot de passe: </p>
        <input className="menu__input menu__input-half" type="text" name="" id="useremail" placeholder="Nouvel email" />
        <input className="menu__input menu__input-half" type="password" name="" id="userpwd" placeholder="Votre mot de passe" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Téléphone</h3>
        <p className="menu__text">
          Votre numéro de téléphone servira à récupérer votre compte en cas de perte ou d'oubli de vos identifiants. Celui-ci est facultatif:
        </p>
        <input className="menu__input menu__input-half" type="text" name="" id="usertelephone" placeholder="Votre numéro de téléphone" />
      </li>
    </ul>
  );
};

export default PersonnalInfos;
