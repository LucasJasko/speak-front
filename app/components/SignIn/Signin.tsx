import { useEffect, useState } from "react";

const Signin = ({ toggleSlide }: { toggleSlide: () => void }) => {
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(!email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/));

    if (email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/)) {
      console.log(email);
    }
  }, [email]);

  useEffect(() => {
    const progressBar = document.querySelector(".progress-bar__value") as HTMLElement;
    const progressBarInfo = document.querySelector(".progress-bar__info") as HTMLElement;
    if (pwd.match("") || pwd.length < 8) {
      progressBar.classList = "progress-bar__value empty";
      progressBarInfo.textContent = "";
      if (pwd.length >= 8) {
        progressBar.classList = "progress-bar__value weak";
        progressBarInfo.textContent = "Sécurité: faible (ajoutez une majuscule et un chiffre)";
        progressBarInfo.style.color = "#fb2c36";
        if (pwd.match(/^(?=.*[A-Z])(?=.*\d).+$/) || pwd.length >= 20) {
          progressBar.classList = "progress-bar__value good";
          progressBarInfo.textContent = "Sécurité: moyenne (entrez 16 caractères et un spécial)";
          progressBarInfo.style.color = "oklch(70.5% 0.213 47.604)";
          if (pwd.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/) && pwd.length >= 16) {
            progressBar.classList = "progress-bar__value strong";
            progressBarInfo.textContent = "Sécurité: forte";
            progressBarInfo.style.color = "oklch(72.3% 0.219 149.579)";
          }
        }
      }
    }
  }, [pwd]);

  const handleSubmit = async (e?: any) => {
    e.preventDefault();

    if (email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/) && pwd.length >= 8 && pwd === confirmPwd) {
      console.log("good !");
    }
    if (!email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/)) {
      setError("L'email renseigné n'est pas au bon format (monemail@exemple.com)");
      return;
    }
    if (pwd.length < 8) {
      setError("Le mot de passe renseigné fait moins de 8 caractères");
      return;
    }
    if (pwd != confirmPwd) {
      setError("La confirmation du mot de passe ne correspond pas au mot de passe renseigné");
      return;
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
          name="user_mail"
          id="mail"
          placeholder="Adresse email (monemail@exemple.com)"
          autoComplete="new-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signin__input"
          type="password"
          name="user_password"
          id="password"
          placeholder="Mot de passe (8 caractères minimum)"
          autoComplete="new-password"
          onChange={(e) => setPwd(e.target.value)}
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
          name="user_password"
          id="confirm-password"
          placeholder="Confirmez votre mot de passe"
          autoComplete="confirm-password"
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
      </div>
      <div className="signin__submit-container">
        <input className="signin__input signin__submit" type="submit" value="Créer mon compte" />
        {error && <p className="signin__message">{error}</p>}
      </div>
      <button className="login__switch" onClick={toggleSlide}>
        <i className="fa-solid fa-arrow-left"></i> Se connecter
      </button>
    </form>
  );
};

export default Signin;
