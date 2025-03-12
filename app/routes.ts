import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/Loader/loader.tsx"),

  route("login", "routes/Login/login.tsx"),

  layout("routes/Home/home.tsx", [route("group", "routes/Home/Group/group.tsx"), route("direct-message", "routes/Home/DirectMessage/directMessage.tsx")]),
] satisfies RouteConfig;
