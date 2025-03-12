const Header = () => {
  return (
    <header className="header">
      <div className="search__area">
        <form className="search__container" action="">
          <input className="main__search" type="search" name="search" id="search" placeholder="Rechercher un élément..." />
        </form>
      </div>
      <div className="header__manage-window">
        <button className="header__manage-button manage-button__reduce">
          <i className="fa-regular fa-window-minimize"></i>
        </button>
        <button className="header__manage-button manage-button__resize">
          <i className="fa-regular fa-clone"></i>
        </button>
        <button className="header__manage-button manage-button__close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
