import type { Route } from "./+types/home";

import Nav from "~/components/Nav/Nav";
import { Outlet } from "react-router";
import Header from "~/components/Header/Header";
import { useEffect, useState, type JSX } from "react";
import Profile from "~/components/Profile/Profile";
import Agenda from "~/components/Agenda/Agenda";
import Settings from "~/components/Settings/Settings";
import AddGroup from "~/components/AddGroup/AddGroup";
import { AnimatePresence, motion } from "motion/react";
import TypeRouter from "./TypeRouter";
import useAPI from "~/hook/useAPI";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Accueil" }, { name: "description", content: "Bienvenue sur l'accueil !" }];
}

export default function Home() {
  const [activeLayout, setActiveLayout] = useState("direct-message");
  const [lastActive, setLastActive] = useState("");

  const [response, setResponse]: any = useState(null);
  const [error, setError]: any = useState(null);

  useAPI("http://alert-mns-back/api/profile/1");

  const handleActive = (currentActive: string) => {
    setActiveLayout(currentActive);
    if (activeLayout == "direct-message" || activeLayout == "group") {
      setLastActive(activeLayout);
    }
  };

  useEffect(() => {
    setResponse("Ceci est un token");
  });

  const componentsMap: Record<string, JSX.Element> = {
    profile: <Profile onClose={handleActive} lastActive={lastActive} />,
    agenda: <Agenda onClose={handleActive} lastActive={lastActive} />,
    settings: <Settings onClose={handleActive} lastActive={lastActive} />,
    addGroup: <AddGroup onClose={handleActive} lastActive={lastActive} />,
  };

  if (response && response == "Ceci est un token") {
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
  } else {
    return <div>{error}</div>;
  }
}
