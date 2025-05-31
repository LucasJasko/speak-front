import { AnimatePresence, motion } from "motion/react";

import type { Route } from "./+types/auth";
import Login from "~/components/Login/Login";
import Signin from "~/components/SignIn/Signin";
import { useEffect, useState } from "react";
import Inscription from "~/components/SignIn/Inscription/Inscription";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Speak - login" }, { name: "description", content: "Votre portail d'accès à Speak" }];
}

const auth = () => {
  const [activePannel, setActivePannel] = useState<string>("login");
  const [previousPannel, setPreviousPannel] = useState<string>("login");
  const [nextPannel, setNextPannel] = useState<string>("");

  const toggleSlide = (pannel: string) => {
    setPreviousPannel(activePannel);
    setNextPannel(pannel);
    setActivePannel(pannel);
  };

  return (
    <div className="auth__container">
      <div className="auth__window">
        <AnimatePresence mode="wait">
          {activePannel == "login" && (
            <motion.div key="first" initial={{ x: "-100%" }} animate={{ x: "0%" }} exit={{ x: "-100%" }}>
              <Login toggleSlide={toggleSlide} />
            </motion.div>
          )}
          {activePannel == "signin" && (
            <motion.div
              key="second"
              initial={{ x: previousPannel === "login" ? "100%" : "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: nextPannel === "login" ? "100%" : "-100%" }}
            >
              <Signin toggleSlide={toggleSlide} />
            </motion.div>
          )}
          {activePannel == "inscription" && (
            <motion.div key="third" initial={{ x: "100%" }} animate={{ x: "0%" }} exit={{ x: "100%" }}>
              <Inscription toggleSlide={toggleSlide} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default auth;
