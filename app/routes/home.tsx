import type { Route } from "./+types/home";
import { Overview as OverviewPage } from "../pages/overview/overview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Overview - React Clean Architecture" },
  ];
}

export default function Overview() {
  return <OverviewPage />;
}
