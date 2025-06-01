import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSettingsContext } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";

const Inscription = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  const { mail, password, surname, setSurname, picture, setPicture, theme, setTheme, name, setName, language, setLanguage, status, setStatus, role, setRole } =
    useSettingsContext();
  let navigate = useNavigate();

  const [error, setError] = useState<string | undefined>(undefined);
  const [picturePreview, setPicturePreview] = useState<string>("");
  const pictureContent = useRef<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    processInscription();
  };

  const processInscription = async () => {
    if (typeof picture == "string") {
      setPicture(picture);
    }
    if (picture === "") {
      setPicture("default.webp");
    }

    setLanguage("1");
    setStatus("1");
    setRole("1");

    const userProfile = {
      mail,
      password,
      name,
      surname,
      picture_name: picture,
      picture_content: pictureContent.current,
      language,
      status,
      theme,
      role,
      secure: "client-speak",
    };

    const res = await useAPI("/profile/0", { json: { userProfile } });

    if (res.data === "201") {
      navigate("/auth");
    } else {
      console.log(res.status);
    }
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (picture === "") {
      fileInputRef.current?.click();
    } else {
      setPicture("");
      setPicturePreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(file.name);
        setPicturePreview(reader.result as string);
        // TODO Ici pictureContent ne prends pas la valeur de file, probablement à cause de l'asynchrone entre l'import du fichier et la ligne suivante
        pictureContent.current = file;
      };
      return reader.readAsDataURL(file);
    }
  };

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

        <label htmlFor="profile_picture" className="signin__input signin__file" onClick={handleLabelClick}>
          Photo de profile {picturePreview == "" && "(optionnel)"}
          {picturePreview == "" && <i className="fa-solid fa-file-arrow-up" />}
          {picturePreview != "" && <img className="signin__preview-img" src={picturePreview} />}
        </label>
        <input type="file" name="profile_picture" id="profile_picture" autoComplete="confirm-password" ref={fileInputRef} onChange={handleFileChange} hidden />
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
        <i className="fa-solid fa-xmark" /> Annuler mon inscription
      </div>
    </form>
  );
};

export default Inscription;
