import type { Route } from "./+types/infrastructures";
import { Infrastructures as InfrastructuresPage } from "~/pages/infrastructures/infrastructures";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "External Integrations - React Clean Architecture" },
  ];
}

export default function Infrastructures() {
  return <InfrastructuresPage />;
}
