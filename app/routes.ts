import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/Auth/Auth.tsx"),

  route("auth", "./routes/Auth/Auth.tsx", { id: "auth" }),

  route("home/:typeID/:convID", "./routes/Home/Home.tsx"),

  route("*", "./routes/Page404/Page404.tsx", { id: "default" }),
] satisfies RouteConfig;
