const Accessibility = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Mode contrasté</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <label className="menu__text" htmlFor="underline-hyperlink">
              Accentuez les contraste de couleurs
            </label>
          </div>
          <div className="menu__body__right">
            <input type="checkbox" name="underline-hyperlink" id="underline-hyperlink" disabled />
          </div>
        </div>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Liens</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <label className="menu__text" htmlFor="underline-hyperlink">
              Souligner les hyperliens dans les conversations
            </label>
          </div>
          <div className="menu__body__right">
            <input type="checkbox" name="underline-hyperlink" id="underline-hyperlink" disabled />
          </div>
        </div>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Niveau de zoom de l'application: </h3>
        <div className="zoom-line">
          <input type="radio" name="zoom-size" id="zoom-size-1" hidden />
          <label className="zoom-lvl" htmlFor="zoom-size-1">
            25%
          </label>
          <input type="radio" name="zoom-size" id="zoom-size-2" hidden />
          <label className="zoom-lvl" htmlFor="zoom-size-2">
            50%
          </label>
          <input type="radio" name="zoom-size" id="zoom-size-3" hidden />
          <label className="zoom-lvl" htmlFor="zoom-size-3">
            100%
          </label>
          <input type="radio" name="zoom-size" id="zoom-size-4" hidden />
          <label className="zoom-lvl" htmlFor="zoom-size-4">
            125%
          </label>
          <input type="radio" name="zoom-size" id="zoom-size-5" hidden />
          <label className="zoom-lvl" htmlFor="zoom-size-5">
            150%
          </label>
        </div>
      </li>
    </ul>
  );
};

export default Accessibility;
