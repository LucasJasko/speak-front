import type { Route } from "../+types/home";

import Header from "~/components/Header/Header";
import Nav from "~/components/Nav/Nav";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
  return (
    <div>
      <Header />
      <Nav />
    </div>
  );
}
