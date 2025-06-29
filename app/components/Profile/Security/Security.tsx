import { useState, type FormEvent } from "react";
import { useAuthContext } from "~/context/AuthContext";
import useAPI from "~/hook/useAPI";

const Security = () => {
  const { accessToken, id } = useAuthContext();

  const [oldPwd, setOldPwd] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("Votre nouveau mot de passe doit faire au moins 8 caractères");

  const [isOldPwdVisible, setIsOldPwdVisible] = useState<boolean>(false);
  const [isNewPwdVisible, setIsNewPwdVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

  function refreshMessage(value: string) {
    if (value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/) && value.length >= 16) {
      setMessage("Sécurité: forte");
    } else if (value.match(/^(?=.*[A-Z])(?=.*\d).+$/) || value.length >= 20) {
      setMessage("Sécurité: moyenne (entrez 16 caractères et un spécial)");
    } else if (value.length >= 8) {
      setMessage("Sécurité: faible (ajoutez une majuscule et un chiffre)");
    } else if (value.length >= 8) {
      setMessage("Sécurité: faible (ajoutez une majuscule et un chiffre)");
    } else if (value.length < 8) {
      setMessage("Votre nouveau mot de passe doit faire au moins 8 caractères");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (oldPwd != "" && newPwd != "" && confirmPassword != "") {
      if (newPwd.length > 8) {
        const res = await useAPI("/edit-profile", {
          json: {
            param: "password",
            oldPwd,
            newPwd,
            id,
          },
          token: accessToken,
        });

        if (res.data == 200) {
          setMessage("Votre mot de passe a bien été modifié !");
        } else if (res.data == 403) {
          setMessage("Votre ancien mot de passe est incorrect");
        } else if (res.data == 500) {
          setMessage("Une erreur est survenue, veuillez réessayer plus tard");
        }
      } else {
        setMessage("Votre nouveau mot de passe est trop court (min. 8 caractères)");
      }
    } else {
      setMessage("Veullez remplir tous les champs");
    }
  }

  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Mot de passe</h3>
        <p className="menu__text">Vous pouvez modifier votre mot de passe ici:</p>
        <div className="menu__input-container">
          <input
            className="menu__input menu__input-password"
            type={isOldPwdVisible ? "text" : "password"}
            name=""
            id="oldpwd"
            placeholder="Ancien mot de passe"
            onChange={(e) => setOldPwd(e.target.value)}
          />
          <span className="menu__reveal-button" onClick={() => setIsOldPwdVisible(!isOldPwdVisible)}>
            {isOldPwdVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="menu__input-container">
            <input
              className="menu__input menu__input-password"
              type={isNewPwdVisible ? "text" : "password"}
              name=""
              id="newpwd"
              placeholder="Nouveau mot de passe"
              onChange={(e) => {
                setNewPwd(e.target.value);
                refreshMessage(e.target.value);
              }}
            />
            <span className="menu__reveal-button" onClick={() => setIsNewPwdVisible(!isNewPwdVisible)}>
              {isNewPwdVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </span>
          </div>
          <div className="menu__input-container">
            <input
              className="menu__input menu__input-password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              name=""
              id="confirmpwd"
              placeholder="Confirmez votre nouveau mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="menu__reveal-button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              {isConfirmPasswordVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </span>
          </div>
          <span className="menu__message">{message}</span>
          <input type="submit" className="menu__button" value="Modifier" />
        </form>
      </li>
    </ul>
  );
};

export default Security;
