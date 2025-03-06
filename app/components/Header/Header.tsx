const Header = () => {
  return (
    <header className="header">
      <div className="search__area">
        <div className="search__container">
          <input className="main__search" type="search" name="search" id="search" placeholder="Rechercher un élément..." />
        </div>
      </div>
      <div className="manage__window">
        <button className="manage__button manage__button__reduce">
          <i className="fa-regular fa-window-minimize"></i>
        </button>
        <button className="manage__button manage__button__resize">
          <i className="fa-regular fa-clone"></i>
        </button>
        <button className="manage__button manage__button__close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
