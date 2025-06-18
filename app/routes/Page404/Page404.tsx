const Page404 = () => {
  return (
    <div className="page404-container">
      <div className="page404-window">
        <h1 className="page404-title">404</h1>

        <p className="page404-text">Oups... Il semblerait que vous vous soyez égaré.</p>
        <div className="page404-button">
          <a className="page404-link" href="/auth">
            Retour vers l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page404;
