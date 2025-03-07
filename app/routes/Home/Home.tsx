import type { Route } from "./+types/home";

import Header from "~/components/Header/Header";
import Nav from "~/components/Nav/Nav";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Accueil" }, { name: "description", content: "Bienvenue sur l'accueil !" }];
}

export default function Home() {
  return (
    <div>
      <Header />
      <Nav />
    </div>
  );
}
