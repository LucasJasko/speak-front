import type { Route } from "./+types/home";

import Nav from "~/components/Nav/Nav";
import Header from "~/components/Header/Header";
import { useEffect, useLayoutEffect, useRef, useState, type JSX } from "react";
import Profile from "~/components/Profile/Profile";
import Agenda from "~/components/Agenda/Agenda";
import Settings from "~/components/Settings/Settings";
import AddGroup from "~/components/AddGroup/AddGroup";
import { AnimatePresence } from "motion/react";
import TypeRouter from "./TypeRouter";
import { useAuthContext } from "~/context/AuthContext";
import { useNavigate } from "react-router";
import Loader from "../Loader/loader";

export function meta({}: Route.MetaArgs) {
  return [{ title: "SPEAK - Accueil" }, { name: "description", content: "Bienvenue sur l'accueil de la plateforme de chatting speak !" }];
}

export default function Home() {
  const { accessToken, id, error, isLoading, fetchToken } = useAuthContext();
  const navigate = useNavigate();

  const [activeLayout, setActiveLayout] = useState("direct-message");
  const [lastActive, setLastActive] = useState("");

  const handleActive = (currentActive: string) => {
    setActiveLayout(currentActive);
    if (activeLayout == "direct-message" || activeLayout == "group") {
      setLastActive(activeLayout);
    }
  };

  const componentsMap: Record<string, JSX.Element> = {
    profile: <Profile onClose={handleActive} lastActive={lastActive} />,
    agenda: <Agenda onClose={handleActive} lastActive={lastActive} />,
    settings: <Settings onClose={handleActive} lastActive={lastActive} />,
    addGroup: <AddGroup onClose={handleActive} lastActive={lastActive} />,
  };

  if (isLoading) {
    return <Loader path="/" />;
  }

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <Nav onClick={handleActive} activeBtn={activeLayout} />
      <main className="main">
        <Header />
        <TypeRouter />
      </main>
      <AnimatePresence>{componentsMap[activeLayout]}</AnimatePresence>
    </div>
  );
}
