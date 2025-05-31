import type { aN } from "node_modules/react-router/dist/development/route-data-B9_30zbP";
import { useEffect, useState } from "react";
import { useSettingsContext } from "~/context/SettingsContext";

const Inscription = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  const { mail, password, surname, setSurname, picture, setPicture, theme, setTheme, name, setName, setLanguage, setStatus, setRole } = useSettingsContext();

  const [error, setError] = useState<string | undefined>(undefined);
  const [picturePreview, setPicturePreview] = useState<string>("");

  const handleSubmit = (e?: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    const pictureInput = document.querySelector("input[type='file']") as HTMLInputElement;

    if (pictureInput.files) {
      const img = pictureInput.files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          const b64Img = reader.result;
          if (typeof b64Img == "string") {
            setPicture(b64Img);
            setPicturePreview(b64Img);
          }
        },
        false
      );

      if (img) {
        reader.readAsDataURL(img);
      }
    }
  }, [picture]);

  return (
    <form className="signin__form" onSubmit={handleSubmit}>
      <div className="signin__header-container">
        <div className="signin__header-container-left">
          <img className="signin-logo" src="../assets/img/Speak_64x64.png" alt="" />
        </div>
        <div className="signin__header-container-right">
          <h1 className="inscription__h1">Nous y sommes presque !</h1>
          <p className="signin__p">Nous avons besoin de quelques informations supplémentaire pour finaliser votre inscription</p>
        </div>
      </div>
      <div className="signin__input-container">
        <input
          className="signin__input"
          type="text"
          name="profile_name"
          id="name"
          placeholder="Prénom"
          autoComplete="surname"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="signin__input"
          type="text"
          name="profile_surname"
          id="surname"
          placeholder="Nom de famille"
          autoComplete="surname"
          onChange={(e) => setSurname(e.target.value)}
        />

        <p className="signin__theme-card__title">Thème</p>
        <div className="signin__theme-card__container">
          <button className={theme === "amazon" ? "signin__theme-card amazon selected" : "signin__theme-card amazon"} onClick={() => setTheme("amazon")}>
            <div className="signin__theme-card__name">Amazon</div>
          </button>
          <button className={theme === "azur" ? "signin__theme-card azur selected" : "signin__theme-card azur"} onClick={() => setTheme("azur")}>
            <div className="signin__theme-card__name">Azur</div>
          </button>
          <button
            className={theme === "grapefruit" ? "signin__theme-card grapefruit selected" : "signin__theme-card grapefruit"}
            onClick={() => setTheme("grapefruit")}
          >
            <div className="signin__theme-card__name">Grapefruit</div>
          </button>
          <button
            className={theme === "hazelnut" ? "signin__theme-card hazelnut selected" : "signin__theme-card hazelnut"}
            onClick={() => setTheme("hazelnut")}
          >
            <div className="signin__theme-card__name">Hazelnut</div>
          </button>
          <button className={theme === "mud" ? "signin__theme-card mud selected" : "signin__theme-card mud"} onClick={() => setTheme("mud")}>
            <div className="signin__theme-card__name">Mud</div>
          </button>
          <button className={theme === "seigle" ? "signin__theme-card seigle selected" : "signin__theme-card seigle"} onClick={() => setTheme("seigle")}>
            <div className="signin__theme-card__name">Seigle</div>
          </button>
        </div>

        <label htmlFor="profile_picture" className="signin__input signin__file">
          Photo de profile
          {picturePreview == "" && <i className="fa-solid fa-file-arrow-up" />}
          {picturePreview != "" && <img className="signin__preview-img" src={picturePreview}></img>}
        </label>
        <input type="file" name="profile_picture" id="profile_picture" autoComplete="confirm-password" onChange={(e) => setPicture(e.target.value)} hidden />
      </div>
      <div className="signin__submit-container">
        <input className="signin__input signin__submit" type="submit" value="Finaliser mon inscription" />
        {error && <p className="signin__message">{error}</p>}
      </div>
      <div
        className="login__switch"
        onClick={() => {
          toggleSlide("signin");
        }}
      >
        <i className="fa-solid fa-xmark"></i> Annuler mon inscription
      </div>
    </form>
  );
};

export default Inscription;
