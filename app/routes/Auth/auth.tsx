import { motion } from "motion/react";

import type { Route } from "./+types/auth";
import Login from "~/components/Login/Login";
import Signin from "~/components/SignIn/Signin";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - login" }, { name: "description", content: "Votre portail d'accès à Alert MNS" }];
}

const auth = () => {
  return (
    <div className="auth__container">
      <motion.div>
        <Login />
      </motion.div>
      <motion.div layout>
        <Signin />
      </motion.div>
    </div>
  );
};

export default auth;
