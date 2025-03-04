import type { Route } from "./+types/home";
import Login from "./login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
  return <Login />;
}
