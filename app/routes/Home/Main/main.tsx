import { Outlet } from "react-router";
import Header from "~/components/Header/Header";

const Main = () => {
  return (
    <main className="main">
      <Header />
      <Outlet />
    </main>
  );
};

export default Main;
