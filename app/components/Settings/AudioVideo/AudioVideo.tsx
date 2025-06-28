const AudioVideo = () => {
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <h3 className="menu__title">Choix du micro</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <p className="menu__text">Choisissez le micro à utiliser pour vos appels: </p>
          </div>
          <div className="menu__body__right">
            <select className="menu__select" name="micro" disabled>
              <option>---</option>
              <option value="2">micro 2</option>
            </select>
          </div>
        </div>
      </li>
      <li className="menu__item">
        <h3 className="menu__title">Choix de la caméra</h3>
        <div className="menu__body">
          <div className="menu__body__left">
            <p className="menu__text">Choisissez le micro à utiliser pour vos appels: </p>
          </div>
          <div className="menu__body__right">
            <select className="menu__select" name="camera" disabled>
              <option>---</option>
              <option value="2">camera 2</option>
            </select>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default AudioVideo;
