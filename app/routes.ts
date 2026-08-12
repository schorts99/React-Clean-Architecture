import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("entities", "routes/entities.tsx"),
  route("use-cases", "routes/use-cases.tsx"),
] satisfies RouteConfig;
