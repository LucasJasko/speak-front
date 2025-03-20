import { AnimatePresence, motion } from "motion/react";

import type { Route } from "./+types/auth";
import Login from "~/components/Login/Login";
import Signin from "~/components/SignIn/Signin";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - login" }, { name: "description", content: "Votre portail d'accès à Alert MNS" }];
}

const auth = () => {
  const [active, setActive] = useState(true);

  const toggleSlide = () => {
    setActive((prev) => !prev);
  };

  const slideVariants = {
    enter: () => ({
      x: "-100%",
      opacity: 0,
    }),
    center: { x: "0%", opacity: 1 },
    exit: () => ({
      x: "-100%",
      opacity: 0,
    }),
  };
  const slideVariants2 = {
    enter: () => ({
      x: "100%",
      opacity: 0,
    }),
    center: { x: "0%", opacity: 1 },
    exit: () => ({
      x: "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="auth__container">
      <div className="auth__window">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div key="first" variants={slideVariants} initial="enter" animate="center" exit="exit">
              <Login toggleSlide={toggleSlide} />
            </motion.div>
          ) : (
            <motion.div key="second" variants={slideVariants2} initial="enter" animate="center" exit="exit">
              <Signin toggleSlide={toggleSlide} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default auth;
