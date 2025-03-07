import type { Route } from "./+types/login";

import React, { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - login" }, { name: "description", content: "Votre portail d'accès à Alert MNS" }];
}

const Login = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e?: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        fetch("http://alert-mns-back/login.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_mail: email, user_password: password }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Réponse du serveur:" + data), setResponse(data);
          });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login__container">
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
            {error && "Erreur: " + { error }}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
