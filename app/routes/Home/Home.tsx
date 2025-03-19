import type { Route } from "./+types/home";

import Nav from "~/components/Nav/Nav";
import { Outlet } from "react-router";
import Header from "~/components/Header/Header";
import { useEffect, useState } from "react";
import Profile from "~/components/Profile/Profile";
import Agenda from "~/components/Agenda/Agenda";
import Settings from "~/components/Settings/Settings";
import AddGroup from "~/components/AddGroup/AddGroup";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Accueil" }, { name: "description", content: "Bienvenue sur l'accueil !" }];
}

export default function Home() {
  const [active, setActive] = useState("");

  const [response, setResponse]: any = useState(null);
  const [error, setError]: any = useState(null);

  useEffect(() => {
    setResponse("Ceci est un token");
  }, []);

  if (response && response == "Ceci est un token") {
    return (
      <div className="home">
        <Nav onClick={(selected) => setActive(selected)} />
        <main className="main">
          <Header />
          <Outlet />
        </main>
        {active == "profile" && <Profile onClick={(selected) => setActive(selected)} />}
        {active == "agenda" && <Agenda onClick={(selected) => setActive(selected)} active={active} />}
        {active == "settings" && <Settings onClick={(selected) => setActive(selected)} />}
        {active == "addGroup" && <AddGroup onClick={(selected) => setActive(selected)} active={active} />}
      </div>
    );
  } else {
    return <div>{error}</div>;
  }
}
