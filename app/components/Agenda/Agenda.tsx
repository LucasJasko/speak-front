const Agenda = () => {
  return (
    <div className="agenda">
      <div className="agenda__window">
        <div className="agenda__header">
          <button className="add__container">
            <i className="fa-solid fa-plus"></i>
          </button>
          <div className="nav__container">
            <button>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <div className="times__container">
              <button className="hour">HH</button>
              <button className="day">JJ</button>
              <button className="month">MM</button>
              <button className="year">AAAA</button>
            </div>
            <button>
              <i className="fa-solid fa-angle-right"></i>
            </button>
            <button>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <button className="manage__button manage__button__close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="agenda__content"></div>
      </div>
    </div>
  );
};

export default Agenda;
