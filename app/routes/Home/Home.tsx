import type { Route } from "./+types/Home";

import Nav from "~/components/Nav/Nav";
import Header from "~/components/Header/Header";
import { type JSX } from "react";
import Profile from "~/components/Profile/Profile";
import Agenda from "~/components/Agenda/Agenda";
import Settings from "~/components/Settings/Settings";
import AddGroup from "~/components/AddGroup/AddGroup";
import { AnimatePresence } from "motion/react";
import { useAuthContext } from "~/context/AuthContext";
import Loader from "../Loader/Loader";
import { useSettingsContext } from "~/context/SettingsContext";
import { useParams } from "react-router";
import DirectMessage from "./DirectMessage/DirectMessage";
import Group from "./Group/Group";

export function meta({}: Route.MetaArgs) {
  return [{ title: "SPEAK - Accueil" }, { name: "description", content: "Bienvenue sur l'accueil de la plateforme de chatting speak !" }];
}

export default function Home() {
  const { error, isLoading } = useAuthContext();
  const { activeLayout } = useSettingsContext();
  const { typeID } = useParams();

  const componentsMap: Record<string, JSX.Element> = {
    profile: <Profile />,
    agenda: <Agenda />,
    settings: <Settings />,
    addGroup: <AddGroup />,
  };

  if (isLoading) return <Loader path="/" />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <Nav />
      <main className="main">
        <Header />
        {typeID == "dm" ? <DirectMessage /> : <Group />}
      </main>
      <AnimatePresence>{componentsMap[activeLayout]}</AnimatePresence>
    </div>
  );
}
