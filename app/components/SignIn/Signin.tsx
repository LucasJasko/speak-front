import { useEffect, useState } from "react";
import { useSettingsContext } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";

const Signin = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  const { password, setPassword, mail, setMail } = useSettingsContext();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar__value") as HTMLElement;
    const progressBarInfo = document.querySelector(".progress-bar__info") as HTMLElement;
    if (password.match("") || password.length < 8) {
      progressBar.classList = "progress-bar__value empty";
      progressBarInfo.textContent = "";

      if (password.length >= 8) {
        progressBar.classList = "progress-bar__value weak";
        progressBarInfo.textContent = "Sécurité: faible (ajoutez une majuscule et un chiffre)";
        progressBarInfo.style.color = "#fb2c36";

        if (password.match(/^(?=.*[A-Z])(?=.*\d).+$/) || password.length >= 20) {
          progressBar.classList = "progress-bar__value good";
          progressBarInfo.textContent = "Sécurité: moyenne (entrez 16 caractères et un spécial)";
          progressBarInfo.style.color = "oklch(70.5% 0.213 47.604)";

          if (password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/) && password.length >= 16) {
            progressBar.classList = "progress-bar__value strong";
            progressBarInfo.textContent = "Sécurité: forte";
            progressBarInfo.style.color = "oklch(72.3% 0.219 149.579)";
          }
        }
      }
    }
  }, [password]);

  const isMailUsed = async (query: string) => {
    try {
      return await useAPI("/search/email", { json: { query } });
    } catch (e: any) {
      return e;
    }
  };

  const handleSubmit = async (e?: any) => {
    e.preventDefault();

    setTimeout(() => {
      setError(undefined);
    }, 4000);

    if (mail.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/) && password.length >= 8 && password === confirmPassword) {
      const isUsed = await isMailUsed(mail);

      if (!isUsed.data) {
        setMail(mail);
        setPassword(password);
        return toggleSlide("inscription");
      } else {
        return setError("Cet email est déjà utilisé");
      }
    }
    if (mail === "") {
      return setError("Veuillez renseigner votre email");
    }
    if (!mail.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/)) {
      return setError("L'email renseigné n'est pas au bon format (monemail@exemple.com)");
    }
    if (password === "") {
      return setError("Veuillez renseigner un mot de passe");
    }
    if (password.length < 8) {
      return setError("Le mot de passe renseigné fait moins de 8 caractères");
    }
    if (password != confirmPassword) {
      return setError("La confirmation du mot de passe ne correspond pas au mot de passe renseigné");
    }
  };

  return (
    <form className="signin__form" onSubmit={handleSubmit}>
      <div className="signin__header-container">
        <div className="signin__header-container-left">
          <img className="signin-logo" src="../assets/img/Speak_64x64.png" alt="" />
        </div>
        <div className="signin__header-container-right">
          <h1 className="signin__h1">SPEAK</h1>
          <p className="signin__p">Inscription à votre plateforme de discussion</p>
        </div>
      </div>
      <div className="signin__input-container">
        <input
          className="signin__input"
          type="text"
          name="profile_mail"
          id="mail"
          placeholder="Adresse email (monemail@exemple.com)"
          autoComplete="new-email"
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          className="signin__input"
          type="password"
          name="profile_password"
          id="password"
          placeholder="Mot de passe (8 caractères minimum)"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="progress-bar__container">
          <div className="progress-bar">
            <div className="progress-bar__info"></div>
            <span className="progress-bar__value empty" />
          </div>
        </div>
        <input
          className="signin__input"
          type="password"
          name="profile_password"
          id="confirm-password"
          placeholder="Confirmez votre mot de passe"
          autoComplete="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="signin__submit-container">
        <input className="signin__input signin__submit" type="submit" value="Créer mon compte" />
        {error && <p className="signin__message">{error}</p>}
      </div>
      <button
        type="button"
        className="login__switch"
        onClick={() => {
          toggleSlide("login");
        }}
      >
        <i className="fa-solid fa-arrow-left"></i> Se connecter
      </button>
    </form>
  );
};

export default Signin;
