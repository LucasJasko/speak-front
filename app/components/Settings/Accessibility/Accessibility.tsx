const Accessibility = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Lien</h3>
        <p className="menu__text">Souligner les hyperliens: </p>
        <input type="checkbox" name="" id="" />
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Niveau de zoom de l'application: </h3>
        <label className="zoom-lvl" htmlFor="zoom-size-1">
          25%{" "}
        </label>
        <input type="radio" name="zoom-size" id="zoom-size-1" /> <br />
        <label className="zoom-lvl" htmlFor="zoom-size-2">
          50%{" "}
        </label>
        <input type="radio" name="zoom-size" id="zoom-size-2" /> <br />
        <label className="zoom-lvl" htmlFor="zoom-size-3">
          100%{" "}
        </label>
        <input type="radio" name="zoom-size" id="zoom-size-3" /> <br />
        <label className="zoom-lvl" htmlFor="zoom-size-4">
          125%{" "}
        </label>
        <input type="radio" name="zoom-size" id="zoom-size-4" /> <br />
        <label className="zoom-lvl" htmlFor="zoom-size-5">
          150%{" "}
        </label>
        <input type="radio" name="zoom-size" id="zoom-size-5" />
      </li>
    </ul>
  );
};

export default Accessibility;
