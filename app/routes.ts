import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/Loader/Loader.tsx"),

  route("login", "routes/Login/Login.tsx"),

  layout("./routes/Home/Home.tsx", [
    layout("./routes/Home/Main/Main.tsx", [
      route("group", "routes/Home/Main/Group/Group.tsx"),
      route("direct-message", "routes/Home/Main/DirectMessage/DirectMessage.tsx"),
    ]),
    route("agenda", "routes/Home/Agenda/Agenda.tsx"),
    route("settings", "routes/Home/Settings/Settings.tsx"),
    route("profile", "routes/Home/Profile/Profile.tsx"),
  ]),
] satisfies RouteConfig;
