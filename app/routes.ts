import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home/home.tsx"),
  route("login", "routes/Login/login.tsx"),
  route("group", "routes/Group/group.tsx"),
  route("direct-message", "routes/DirectMessage/directMessage.tsx"),
] satisfies RouteConfig;
