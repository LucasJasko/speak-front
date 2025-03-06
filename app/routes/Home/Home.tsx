import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
  return <h1>Home</h1>;
}
