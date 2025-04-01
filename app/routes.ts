import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Loader/loader.tsx"),

  route("Auth", "routes/Auth/auth.tsx"),

  route("home", "routes/Home/home.tsx", [route(":typeID/:convID", "routes/Home/TypeRouter.tsx")]),
] satisfies RouteConfig;
