import { useEffect, useState } from "react";
import useAPI from "~/hook/useAPI";

const Signin = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

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

  const isMailUsed = async (query: string) => {
    try {
      const response: Array<string> = await useAPI("/search/email", {
        json: {
          query,
        },
      });
      console.log(response);

      return response;
    } catch (e: any) {
      return e;
    }
  };

  const handleSubmit = async (e?: any) => {
    e.preventDefault();

    setTimeout(() => {
      setError(undefined);
    }, 4000);

    if (email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/) && pwd.length >= 8 && pwd === confirmPwd) {
      const isUsed = await isMailUsed(email);

      if (!isUsed) {
        toggleSlide("inscription");
        return console.log("good !");
      } else {
        return setError("Cet email est déjà utilisé");
      }
    }
    if (email === "") {
      return setError("Veuillez renseigner votre email");
    }
    if (!email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/)) {
      return setError("L'email renseigné n'est pas au bon format (monemail@exemple.com)");
    }
    if (pwd === "") {
      return setError("Veuillez renseigner un mot de passe");
    }
    if (pwd.length < 8) {
      return setError("Le mot de passe renseigné fait moins de 8 caractères");
    }
    if (pwd != confirmPwd) {
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
      <div
        className="login__switch"
        onClick={() => {
          toggleSlide("login");
        }}
      >
        <i className="fa-solid fa-arrow-left"></i> Se connecter
      </div>
    </form>
  );
};

export default Signin;
