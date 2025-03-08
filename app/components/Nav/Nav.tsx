const Nav = () => {
  return (
    <nav className="nav">
      <section className="nav__top">
        <button className="nav__link nav__link__direct">
          <i className="fa-regular fa-comments"></i>
        </button>
        <button className="nav__link nav__link__group">
          <i className="fa-solid fa-user-group"></i>
        </button>
        <button className="nav__link nav__link__add">
          <i className="fa-solid fa-plus"></i>
        </button>
      </section>
      <section className="nav__bottom">
        <button className="nav__link nav__link__agenda">
          <i className="fa-regular fa-calendar"></i>
        </button>
        <button className="nav__link nav__link__profile">
          <i className="fa-solid fa-user"></i>
        </button>
        <button className="nav__link nav__link__settings">
          <i className="fa-solid fa-gear"></i>
        </button>
      </section>
    </nav>
  );
};

export default Nav;
