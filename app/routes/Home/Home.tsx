import type { Route } from "./+types/home";

import Nav from "~/components/Nav/Nav";
import Header from "~/components/Header/Header";
import { useEffect, useRef, useState, type JSX } from "react";
import Profile from "~/components/Profile/Profile";
import Agenda from "~/components/Agenda/Agenda";
import Settings from "~/components/Settings/Settings";
import AddGroup from "~/components/AddGroup/AddGroup";
import { AnimatePresence } from "motion/react";
import TypeRouter from "./TypeRouter";
import { useAuthContext } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Accueil" }, { name: "description", content: "Bienvenue sur l'accueil !" }];
}

export default function Home() {
  const { token, id } = useAuthContext();

  const [activeLayout, setActiveLayout] = useState("direct-message");
  const [lastActive, setLastActive] = useState("");

  const handleActive = (currentActive: string) => {
    setActiveLayout(currentActive);
    if (activeLayout == "direct-message" || activeLayout == "group") {
      setLastActive(activeLayout);
    }
  };

  useEffect(() => {
    console.log(token);
    console.log(id);

    // axios.get("http://alert-mns-back/api/profile/" + id).then((res) => console.log(res.data));
  }, []);

  const componentsMap: Record<string, JSX.Element> = {
    profile: <Profile onClose={handleActive} lastActive={lastActive} />,
    agenda: <Agenda onClose={handleActive} lastActive={lastActive} />,
    settings: <Settings onClose={handleActive} lastActive={lastActive} />,
    addGroup: <AddGroup onClose={handleActive} lastActive={lastActive} />,
  };

  if (!token || !id) {
    return <div>Chargement...</div>;
  } else {
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

  // } else {
  //   return <div>{error}</div>;
  // }
}
