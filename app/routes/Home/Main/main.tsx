import { Outlet } from "react-router";
import Header from "~/components/Header/Header";

const main = () => {
  return (
    <main className="main">
      <Header />
      <Outlet />
    </main>
  );
};

export default main;
