import type { Route } from "./+types/Home";

import Nav from "~/components/Nav/Nav";
import { Outlet } from "react-router";
import Main from "./Main/Main";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Accueil" }, { name: "description", content: "Bienvenue sur l'accueil !" }];
}

export default function Home() {
  return (
    <div className="home">
      <Nav />
      <Outlet />
    </div>
  );
}
