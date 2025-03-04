export default function Login() {
  return (
    <form method="post">
      <input type="text" name="user_mail" id="mail" placeholder="Entrez votre adresse email" />
      <input type="password" name="user_password" id="password" placeholder="Entrez votre mot de passe" />
      <input type="submit" value="Se connecter" />
    </form>
  );
}
