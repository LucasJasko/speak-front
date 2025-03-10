import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/Loader/loader.tsx"),

  route("login", "routes/Login/login.tsx"),

  layout("./routes/Home/home.tsx", [
    layout("./routes/Home/Main/main.tsx", [
      route("group", "routes/Home/Main/Group/group.tsx"),
      route("direct-message", "routes/Home/Main/DirectMessage/directMessage.tsx"),
    ]),
    route("agenda", "routes/Home/Agenda/Agenda.tsx"),
    route("settings", "routes/Home/Settings/Settings.tsx"),
    route("profile", "routes/Home/Profile/Profile.tsx"),
  ]),
] satisfies RouteConfig;
