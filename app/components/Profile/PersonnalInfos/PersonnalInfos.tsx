import { useEffect, useState, type FormEvent } from "react";
import { useAuthContext } from "~/context/AuthContext";
import { useSettingsContext } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";

const PersonnalInfos = () => {
  const { accessToken, id } = useAuthContext();
  const { mail, setMail } = useSettingsContext();

  const [isMailVisible, setIsMailVisible] = useState<boolean>(false);
  const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);

  const [newMail, setNewMail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (newMail != "" && confirmPassword != "") {
      if (newMail.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/)) {
        const res = await useAPI("/edit-profile", {
          json: {
            param: "mail",
            new: newMail,
            pwd: confirmPassword,
            id,
          },
          token: accessToken,
        });

        if (res.data == 200) {
          setMessage("Votre email a bien été modifié !");
          setMail(newMail);
        } else if (res.data == 403) {
          setMessage("Mot de passe incorrect");
        } else if (res.data == 500) {
          setMessage("Une erreur est survenue, veuillez réessayer plus tard");
        }
      } else {
        setMessage("Votre email n'est pas au bon format (exemple@mail.com)");
      }
    } else {
      setMessage("Veullez remplir tous les champs");
    }
  }

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
        <div className="menu__input-container">
          <input
            className="menu__input menu__input-half"
            type={isMailVisible ? "text" : "password"}
            name="new-mail"
            value={mail}
            placeholder="Nouvel email"
            readOnly
          />
          <span className="menu__reveal-button personnalInfos-reveal-button" onClick={() => setIsMailVisible(!isMailVisible)}>
            {isMailVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
          </span>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="menu__input menu__input-half"
            type="text"
            name=""
            id="useremail"
            placeholder="Nouvel email"
            onChange={(e) => setNewMail(e.target.value)}
          />
          <div className="menu__input-container">
            <input
              className="menu__input menu__input-half"
              type={isPwdVisible ? "text" : "password"}
              name="userpwd"
              id="userpwd"
              placeholder="Votre mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="menu__reveal-button personnalInfos-reveal-button" onClick={() => setIsPwdVisible(!isPwdVisible)}>
              {isPwdVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </span>
          </div>
          <span className="menu__message">{message}</span>
          <input type="submit" className="menu__button" value="Modifier" />
        </form>
      </li>
      {/* <li className="menu__item">
        <h3 className="menu__title">Téléphone</h3>
        <p className="menu__text">
          Votre numéro de téléphone servira à récupérer votre compte en cas de perte ou d'oubli de vos identifiants. Celui-ci est facultatif:
        </p>
        <input className="menu__input menu__input-half" type="text" name="" id="usertelephone" placeholder="Votre numéro de téléphone" />
      </li> */}
    </ul>
  );
};

export default PersonnalInfos;
