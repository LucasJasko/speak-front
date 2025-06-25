import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { useMobileContext } from "~/context/MobileContext";
import useAPI from "~/hook/useAPI";
import type { LoginResponse } from "~/interfaces/LoginResponse";

const Login = ({ toggleSlide }: { toggleSlide: (pannel: string) => void }) => {
  let navigate = useNavigate();

  const [response, setResponse]: any = useState(null);
  const [error, setError]: any = useState(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isMobile } = useMobileContext();
  const { login } = useAuthContext();

  const handleSubmit = async (e?: any) => {
    e.preventDefault();

    if (email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/) && password != "") {
      try {
        const { data, status } = await useAPI<LoginResponse>("/login", { json: { email, password } });
        setResponse(data);

        if (status === 200) {
          // Auth params
          login(data.UID, data.accessToken);

          return navigate("/home/dm/0");
        }

        if (status === 401) {
          return setError(data.message);
        }
      } catch (error: any) {
        return setError(error.message);
      }
    }

    if (email === "") {
      return setError("Veuillez renseigner votre email");
    }

    if (!email.match(/^[^@]+@[^@.]+\.[a-z]{1,63}$/)) {
      return setError("L'email renseigné n'est pas au bon format (monemail@exemple.com)");
    }

    if (password === "") {
      return setError("Veuillez renseigner votre mot de passe");
    }
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__header-container">
        <div className="login__header-container-left">
          <img className="login-logo" src="../assets/img/Speak_64x64.png" alt="" />
        </div>
        <div className="login__header-container-right">
          <h1 className="login__h1">SPEAK</h1>
          <p className="login__p">Connexion à votre plateforme de discussion</p>
        </div>
      </div>
      <div className="login__input-container">
        <input
          className="login__input"
          type="text"
          name="user_mail"
          id="mail"
          placeholder="Entrez votre adresse email"
          autoComplete="mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          name="user_password"
          id="password"
          placeholder="Entrez votre mot de passe"
          autoComplete="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login__submit-container">
        <input className="login__input login__submit" type="submit" value="Se connecter" />
      </div>
      {(response || error) && (
        <p className={!isMobile ? "login__message" : "login__message login__message-mobile"}>
          {response ? response.message : ""}
          {error && !response ? "" + error : ""}
        </p>
      )}
      <button
        type="button"
        className="login__switch"
        onClick={() => {
          toggleSlide("signin");
        }}
      >
        S'inscrire <i className="fa-solid fa-arrow-right"></i>
      </button>
    </form>
  );
};

export default Login;
