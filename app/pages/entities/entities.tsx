import { PageHeader } from "~/components/page-header";
import { EntityCard } from "~/components/entities/entity-card";

export function Entities() {
  return (
    <>
      <PageHeader
        title="Domain Entities"
        subtitle="Manage the core data models of your application architecture."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
      </div>
    </>
  );
}
