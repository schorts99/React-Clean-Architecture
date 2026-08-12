import type { Route } from "./+types/use-cases"
import { UseCases as UseCasesPage } from "~/pages/use-cases/use-cases";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Application Use Cases - React Clean Architecture" },
  ];
}

export default function UseCases() {
  return <UseCasesPage />;
}
