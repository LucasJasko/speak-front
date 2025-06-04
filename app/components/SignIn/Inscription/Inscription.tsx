import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSettingsContext } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";

const Inscription = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  const {
    mail,
    setMail,
    password,
    setPassword,
    surname,
    setSurname,
    picture,
    setPicture,
    theme,
    setTheme,
    name,
    setName,
    language,
    setLanguage,
    status,
    setStatus,
    role,
    setRole,
  } = useSettingsContext();
  let navigate = useNavigate();

  const [error, setError] = useState<string | undefined>(undefined);
  const [pictureContent, setPictureContent] = useState<string | ArrayBuffer | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: any) => {
    e.preventDefault();

    if (name === "") {
      return setError("Veuillez renseigner votre prénom");
    }

    if (surname === "") {
      return setError("Veuillez renseigner votre nom de famille");
    }

    if (theme === "") {
      return setError("Veuillez choisir un thème d'application");
    }

    if (picture === "") setPicture("default.webp");

    const res = await useAPI("/profile/0", {
      json: {
        mail,
        password,
        name: name.replace(" ", "-"),
        surname: surname.replace(" ", "-"),
        picture,
        pictureContent,
        language: "1",
        status: "1",
        theme,
        role: "2",
        secure: "client-speak",
      },
    });

    if (res.data === "Account created !") {
      toggleSlide("final");
      setMail("");
      setPassword("");
    } else {
      setError("Une erreur est survenue... veuillez réessayer prochainement.");
    }
  };

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <form ref={form} className="signin__form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="signin__header-container">
        <div className="signin__header-container-left">
          <img className="signin-logo" src="../assets/img/Speak_64x64.png" alt="speak-logo-image" />
        </div>
        <div className="signin__header-container-right">
          <h1 className="inscription__h1">Nous y sommes presque !</h1>
          <p className="signin__p">Nous avons besoin de quelques informations supplémentaire pour finaliser votre inscription</p>
        </div>
      </div>
      <div className="signin__input-container">
        <input className="signin__input" type="text" name="profile_name" placeholder="Prénom" onChange={(e) => setName(e.target.value)} />
        <input className="signin__input" type="text" name="profile_surname" placeholder="Nom de famille" onChange={(e) => setSurname(e.target.value)} />

        <p className="signin__theme-card__title">Thème</p>
        <div className="signin__theme-card__container">
          <button
            type="button"
            className={theme === "amazon" ? "signin__theme-card amazon selected" : "signin__theme-card amazon"}
            onClick={() => setTheme("amazon")}
          >
            <div className="signin__theme-card__name">Amazon</div>
          </button>
          <button type="button" className={theme === "azur" ? "signin__theme-card azur selected" : "signin__theme-card azur"} onClick={() => setTheme("azur")}>
            <div className="signin__theme-card__name">Azur</div>
          </button>
          <button
            type="button"
            className={theme === "grapefruit" ? "signin__theme-card grapefruit selected" : "signin__theme-card grapefruit"}
            onClick={() => setTheme("grapefruit")}
          >
            <div className="signin__theme-card__name">Grapefruit</div>
          </button>
          <button
            type="button"
            className={theme === "hazelnut" ? "signin__theme-card hazelnut selected" : "signin__theme-card hazelnut"}
            onClick={() => setTheme("hazelnut")}
          >
            <div className="signin__theme-card__name">Hazelnut</div>
          </button>
          <button type="button" className={theme === "mud" ? "signin__theme-card mud selected" : "signin__theme-card mud"} onClick={() => setTheme("mud")}>
            <div className="signin__theme-card__name">Mud</div>
          </button>
          <button
            type="button"
            className={theme === "seigle" ? "signin__theme-card seigle selected" : "signin__theme-card seigle"}
            onClick={() => setTheme("seigle")}
          >
            <div className="signin__theme-card__name">Seigle</div>
          </button>
        </div>

        <label htmlFor="profile_picture" className="signin__input signin__file">
          Photo de profile {pictureContent == null && "(optionnel)"}
          {pictureContent == null && <i className="fa-solid fa-file-arrow-up" />}
          {typeof pictureContent == "string" && <img className="signin__preview-img" src={pictureContent} />}
        </label>
        <input
          ref={inputFile}
          type="file"
          name="profile_picture"
          id="profile_picture"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file && file.size < 1000000) {
              // 1 000 000 o = ~ 1 Mo
              const b64 = await toBase64(file);
              setPictureContent(b64);
              setPicture(file.name);
            }
          }}
        />
      </div>
      <input type="hidden" name="profile_email" value={mail} />
      <input type="hidden" name="profile_password" value={password} />
      <input type="hidden" name="status_id" value={status} />
      <input type="hidden" name="theme_id" value={theme} />
      <input type="hidden" name="role_id" value={role} />
      <div className="signin__submit-container">
        <input className="signin__input signin__submit" type="submit" value="Finaliser mon inscription" />
        {error && <p className="signin__message">{error}</p>}
      </div>
      <div
        className="login__switch"
        onClick={() => {
          toggleSlide("signin");
          setMail("");
          setPassword("");
        }}
      >
        <i className="fa-solid fa-xmark" /> Annuler mon inscription
      </div>
    </form>
  );
};

export default Inscription;
