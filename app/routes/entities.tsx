import type { Route } from "./+types/entities";
import { Entities as EntitiesPage } from "~/pages/entities/entities";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Domain Entities - React Clean Architecture" },
  ];
}

export default function Entities() {
  return <EntitiesPage />;
}
