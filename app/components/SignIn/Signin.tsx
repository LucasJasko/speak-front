const Signin = ({ toggleSlide }: { toggleSlide: () => void }) => {
  const handleSubmit = async (e?: any) => {
    e.preventDefault();
  };

  return (
    <form className="signin__form" onSubmit={handleSubmit}>
      <div className="signin__header-container">
        <div className="signin__header-container-left">
          <img className="signin-logo" src="../assets/img/Speak_64x64.png" alt="" />
        </div>
        <div className="signin__header-container-right">
          <h1 className="signin__h1">SPEAK</h1>
          <p className="signin__p">Inscription à votre plateforme de discussion</p>
        </div>
      </div>
      <div className="signin__input-container">
        <input className="signin__input" type="text" name="user_mail" id="mail" placeholder="Entrez votre adresse email" />
        <input className="signin__input" type="password" name="user_password" id="password" placeholder="Entrez votre mot de passe" />
        <input className="signin__input" type="password" name="user_password" id="password" placeholder="Confirmez votre mot de passe" />
      </div>
      <div className="signin__submit-container">
        <input className="signin__input signin__submit" type="submit" value="Créer mon compte" />
        <p className="signin__message">
          {/* {response && response["message"]}
          {loading && "Chargement"}
          {error && "Erreur: " + { error }} */}
        </p>
      </div>
      <button className="login__switch" onClick={toggleSlide}>
        <i className="fa-solid fa-arrow-left"></i> Se connecter
      </button>
    </form>
  );
};

export default Signin;
