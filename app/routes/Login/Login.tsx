import type { Route } from "../Login/+types/login";

import React, { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - login" }, { name: "description", content: "Votre portail d'accès à Alert MNS" }];
}

const Login = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function fetchLogin(e: any) {
    e.preventDefault();
    try {
      const res = await fetch("http://alert-mns-back/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP erreur. Status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Réponse du serveur:");

      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;
  }

  return (
    <div className="form__container">
      <form method="post" onSubmit={fetchLogin}>
        <input type="text" name="user_mail" id="mail" placeholder="Entrez votre adresse email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="user_password" id="password" placeholder="Entrez votre mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
