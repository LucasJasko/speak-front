import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/Auth/auth.tsx"),

  route("Auth", "./routes/Auth/auth.tsx", { id: "auth" }),

  route("home", "./routes/Home/home.tsx", [route(":typeID/:convID", "routes/Home/TypeRouter.tsx")]),

  route("*", "./routes/Page404/Page404.tsx", { id: "default" }),
] satisfies RouteConfig;
