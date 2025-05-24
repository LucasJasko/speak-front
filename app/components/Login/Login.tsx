import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { useMobileContext } from "~/context/MobileContext";
import useAPI, { type LoginResponse } from "~/hook/useAPI";

const Login = ({ toggleSlide }: { toggleSlide: () => void }) => {
  let navigate = useNavigate();

  const [response, setResponse]: any = useState(null);
  const [error, setError]: any = useState(null);

  const [email, setEmail]: any = useState(null);
  const [password, setPassword]: any = useState(null);

  const { isMobile } = useMobileContext();
  const { login } = useAuthContext();

  const handleSubmit = async (e?: any) => {
    e.preventDefault();

    try {
      const data = await useAPI<LoginResponse>("/login", { json: { email, password } });

      setResponse(data);
      setTimeout(() => {
        setResponse(null);
      }, 4000);

      if (data.success) {
        login(data.data.UID, data.data.accessToken);
        navigate("/home/dm-123/abc123");
      }
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__header-container">
        <h1 className="login__h1">Alert MNS</h1>
        <p className="login__p">Connexion à votre plateforme de discussion</p>
      </div>
      <div className="login__input-container">
        <input
          className="login__input"
          type="text"
          name="user_mail"
          id="mail"
          placeholder="Entrez votre adresse email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          name="user_password"
          id="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login__submit-container">
        <input className="login__input login__submit" type="submit" value="Se connecter" />
      </div>
      {(response || error) && (
        <p className={!isMobile ? "login__message" : "login__message login__message-mobile"}>
          {response ? response.message : ""}
          {error && !response ? "Erreur: " + error : ""}
        </p>
      )}
      <button className="login__switch" onClick={toggleSlide}>
        S'inscrire <i className="fa-solid fa-arrow-right"></i>
      </button>
    </form>
  );
};

export default Login;
