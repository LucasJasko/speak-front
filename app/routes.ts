import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home/Home.tsx"),
  route("login", "routes/Login/Login.tsx"),
  route("group", "routes/Group/Group.tsx"),
  route("direct-message", "routes/DirectMessage/DirectMessage.tsx"),
] satisfies RouteConfig;
