import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/Loader/loader.tsx"),

  route("Auth", "routes/Auth/auth.tsx"),

  route("home", "routes/Home/home.tsx", [
    route("group", "routes/Home/Group/group.tsx"),
    route("direct-message", "routes/Home/DirectMessage/directMessage.tsx"),
  ]),
] satisfies RouteConfig;
