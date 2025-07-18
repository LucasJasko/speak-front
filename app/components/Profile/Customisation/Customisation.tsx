import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "~/context/AuthContext";
import { useSettingsContext } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";
import type { StatusType } from "~/interfaces/StatusType";

const Customisation = () => {
  const { id, accessToken } = useAuthContext();
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
    status,
    setStatus,
    role,
    fetchStatus,
  } = useSettingsContext();
  const [pictureContent, setPictureContent] = useState<string | ArrayBuffer | null>(null);
  const [statusList, setStatusList] = useState<StatusType[]>([]);
  const inputFile = useRef<HTMLInputElement>(null);

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const fetchStatusList = async () => {
    const list = await fetchStatus();
    console.log(list);

    setStatusList(list);
  };

  useEffect(() => {
    fetchStatusList();
  }, []);

  async function saveStatus(e: any) {
    const { data } = await useAPI("/edit-status", { json: { statusId: e.target.value, id }, token: accessToken });
    setStatus(e.target.value);
  }

  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Photo de profil</h3>
        <form>
          <label htmlFor="profile_picture" className="menu__input-file">
            Photo de profil {pictureContent == null && "(optionnel)"}
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
          {inputFile.current?.value != "" && <input type="submit" value="modifier" />}
        </form>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Statut d'activité</h3>
        <p className="menu__text">Choisissez votre statut actuel:</p>
        <select className="menu__input" name="status" id="status" onChange={saveStatus}>
          {statusList.map((status) => (
            <option key={status.status_id} value={status.status_id}>
              {status.status_name}
            </option>
          ))}
        </select>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Nom d'utilisateur</h3>
        <p className="menu__text">Votre nom d'utilisateur (pseudo) qui sera visible par les autres utilisateurs:</p>
        <input className="menu__input" type="text" name="" id="" placeholder="Votre nom d'utilisateur" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Biographie</h3>
        <p className="menu__text">Le message qui sera visible sur votre profil:</p>
        <input className="menu__input menu__input-full" type="text" name="" id="" placeholder="Votre biographie" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Message d'absence</h3>
        <p className="menu__text">
          Vous pouvez définir un message d'absence. Celui-ci sera envoyé à tout utilisateur souhaitant vous envoyer un message direct pendant la période
          définie:
        </p>
        <input className="menu__input menu__input-full" type="text" name="" id="" placeholder="Votre message" />
        <div className="menu__wrapper">
          <p className="menu__text">Du:</p>
          <input className="menu__input" type="date" name="" id="" />
          <p className="menu__text">Au:</p>
          <input className="menu__input" type="date" name="" id="" />
        </div>
      </li>
    </ul>
  );
};

export default Customisation;
