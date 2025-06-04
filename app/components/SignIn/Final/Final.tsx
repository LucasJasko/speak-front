import { useEffect } from "react";

const Final = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  useEffect(() => {
    setTimeout(() => {
      toggleSlide("login");
    }, 5000);
  }, []);

  return (
    <div className="signin__form final__container">
      <div className="signin__header-container">
        <div className="signin__header-container-left"></div>
        <div className="signin__header-container-right">
          <h1 className="inscription__h1">Félicitation !</h1>
          <p className="signin__p">Votre inscription est finalisé, vous allez être redirigé vers l'accueil.</p>
        </div>
      </div>

      <svg width="115px" height="115px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="check-group" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5" />
          <circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5" />
          <circle id="outline" stroke="#07b481" strokeWidth="4" cx="66.5" cy="66.5" r="54.5" />
          <polyline id="check" stroke="#FFFFFF" strokeWidth="5.5" points="41 70 56 85 92 49" />
        </g>
      </svg>
    </div>
  );
};

export default Final;
