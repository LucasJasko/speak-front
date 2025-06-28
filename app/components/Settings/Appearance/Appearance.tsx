import { useAuthContext } from "~/context/AuthContext";
import { useSettingsContext } from "~/context/SettingsContext";
import useAPI from "~/hook/useAPI";

const Appearance = () => {
  const { accessToken, id } = useAuthContext();
  const { theme, setTheme } = useSettingsContext();

  async function modifyTheme(theme: string) {
    setTheme(theme);
    const res = await useAPI("/theme", {
      json: { id, theme },
      token: accessToken,
    });
    console.log(res);
  }

  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Thème d'interface</h3>
        <p className="menu__text">Choisissez le thème à afficher pour Alert MNS: </p>

        <div className="signin__theme-card__container">
          <button
            type="button"
            className={theme === "amazon" ? "signin__theme-card amazon selected" : "signin__theme-card amazon"}
            onClick={() => modifyTheme("amazon")}
          >
            <div className="signin__theme-card__name">Amazon</div>
          </button>
          <button
            type="button"
            className={theme === "azur" ? "signin__theme-card azur selected" : "signin__theme-card azur"}
            onClick={() => modifyTheme("azur")}
          >
            <div className="signin__theme-card__name">Azur</div>
          </button>
          <button
            type="button"
            className={theme === "grapefruit" ? "signin__theme-card grapefruit selected" : "signin__theme-card grapefruit"}
            onClick={() => modifyTheme("grapefruit")}
          >
            <div className="signin__theme-card__name">Grapefruit</div>
          </button>
          <button
            type="button"
            className={theme === "hazelnut" ? "signin__theme-card hazelnut selected" : "signin__theme-card hazelnut"}
            onClick={() => modifyTheme("hazelnut")}
          >
            <div className="signin__theme-card__name">Hazelnut</div>
          </button>
          <button type="button" className={theme === "mud" ? "signin__theme-card mud selected" : "signin__theme-card mud"} onClick={() => modifyTheme("mud")}>
            <div className="signin__theme-card__name">Mud</div>
          </button>
          <button
            type="button"
            className={theme === "seigle" ? "signin__theme-card seigle selected" : "signin__theme-card seigle"}
            onClick={() => modifyTheme("seigle")}
          >
            <div className="signin__theme-card__name">Seigle</div>
          </button>
        </div>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Mode claire / sombre</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <p className="menu__text">Choisissez le mode à appliquer pour votre application: </p>
          </div>
          <div className="menu__body__right">
            <select className="menu__select" name="mode" disabled>
              <option>---</option>
              <option value="1">Claire</option>
              <option value="2">Sombre</option>
            </select>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Appearance;
