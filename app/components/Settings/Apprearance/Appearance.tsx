const Appearance = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Thème d'interface</h3>
        <p className="menu__text">Choisissez le thème à afficher pour Alert MNS: </p>
        <select name="" id="">
          <option value="">Thème par défaut</option>
          <option value="">Thème 1</option>
          <option value="">Thème 2</option>
          <option value="">Thème 3</option>
          <option value="">Thème 4</option>
        </select>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Mode claire / sombre</h3>
        <p className="menu__text">Choisissez le mode à appliquer pour Alert MNS: </p>
        <select name="" id="">
          <option value="">Mode de l'OS</option>
          <option value="">Claire</option>
          <option value="">Sombre</option>
        </select>
      </li>
    </ul>
  );
};

export default Appearance;
