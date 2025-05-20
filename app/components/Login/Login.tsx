import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";

const Login = ({ toggleSlide }: { toggleSlide: () => void }) => {
  let navigate = useNavigate();
  const [response, setResponse]: any = useState(null);
  const [loading, setLoading]: any = useState(false);
  const [error, setError]: any = useState(null);

  const [email, setEmail]: any = useState(null);
  const [password, setPassword]: any = useState(null);

  const handleSubmit = async (e?: any) => {
    e.preventDefault();
    setResponse(null);
    setLoading(true);
    setError(null);

    try {
      await fetch("http://alert-mns-back/api/login", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          data["success"] ? navigate("/home/dm-123/abc123") : "";
        });
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
        <p className="login__message">
          {response && response["message"]}
          {loading && "Chargement"}
          {error && "Erreur: " + error}
        </p>
      </div>
      <button className="login__switch" onClick={toggleSlide}>
        S'inscrire <i className="fa-solid fa-arrow-right"></i>
      </button>
    </form>
  );
};

export default Login;
