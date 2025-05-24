import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { useMobileContext } from "~/context/MobileContext";
import useAPI, { type LoginResponse } from "~/hook/useAPI";

const Login = ({ toggleSlide }: { toggleSlide: () => void }) => {
  let navigate = useNavigate();
  const [response, setResponse]: any = useState(null);
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState(null);

  const [email, setEmail]: any = useState(null);
  const [password, setPassword]: any = useState(null);
  const { isMobile } = useMobileContext();

  const { token, setToken, id, setId } = useAuthContext();

  const handleSubmit = async (e?: any) => {
    e.preventDefault();
    setResponse(null);
    setLoading(true);
    setError(null);

    try {
      const data = await useAPI<LoginResponse>("/login", { json: { email, password } });

      setResponse(data);
      setToken(data.data.accessToken);
      setId(data.data.UID);

      if (data.success) {
        navigate("/home/dm-123/abc123");
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    console.log(token);
    console.log(id);
  }, [token]);

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
      {(response || loading || error) && (
        <p className={!isMobile ? "login__message" : "login__message login__message-mobile"}>
          {response && response.message}
          {loading && !response ? "Chargement" : ""}
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
