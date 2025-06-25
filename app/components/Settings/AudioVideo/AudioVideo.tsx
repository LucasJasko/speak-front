const AudioVideo = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Choix du micro</h3>
        <p className="menu__text">Choisissez le micro à utiliser pour vos appels: </p>
        <select name="" id="">
          <option value="1">micro 1</option>
          <option value="2">micro 2</option>
        </select>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Choix de la caméra</h3>
        <p className="menu__text">Choisissez le micro à utiliser pour vos appels: </p>
        <select name="" id="">
          <option value="1">camera 1</option>
          <option value="2">camera 2</option>
        </select>
      </li>
    </ul>
  );
};

export default AudioVideo;
