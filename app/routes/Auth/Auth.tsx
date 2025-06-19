import { AnimatePresence, motion } from "motion/react";

import type { Route } from "./+types/Auth";
import Login from "~/components/Login/Login";
import Signin from "~/components/SignIn/Signin";
import { useEffect, useState } from "react";
import Inscription from "~/components/SignIn/Inscription/Inscription";
import Final from "~/components/SignIn/Final/Final";
import { useAuthContext } from "~/context/AuthContext";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Speak - login" }, { name: "description", content: "Votre portail d'accès à Speak" }];
}

const Auth = () => {
  let navigate = useNavigate();
  const { accessToken, isLoading, setIsLoading, fetchAccessToken } = useAuthContext();

  const [activePannel, setActivePannel] = useState<string>("login");
  const [previousPannel, setPreviousPannel] = useState<string>("login");
  const [nextPannel, setNextPannel] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    if (accessToken) {
      navigate("/home");
    }

    if (accessToken === undefined) {
      fetchAccessToken();
    }

    setIsLoading(false);
  }, [accessToken]);

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
            <motion.div
              key="third"
              initial={{ x: previousPannel === "signin" ? "100%" : "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: nextPannel === "signin" ? "100%" : "-100%" }}
            >
              <Inscription toggleSlide={toggleSlide} />
            </motion.div>
          )}
          {activePannel == "final" && (
            <motion.div key="fourth" initial={{ x: "100%" }} animate={{ x: "0%" }} exit={{ x: "100%" }}>
              <Final toggleSlide={toggleSlide} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
