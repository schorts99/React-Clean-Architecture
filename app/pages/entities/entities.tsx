import { useAllEntities } from "~/hooks";

import { PageHeader } from "~/components/page-header";
import { EntityCard } from "~/components/entities/entity-card";

export function Entities() {
  const { loading, entities } = useAllEntities();

  return (
    <>
      <PageHeader
        title="Domain Entities"
        subtitle="Manage the core data models of your application architecture."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {loading
          ? null
          : entities.map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
            />
          ))}
      </div>
    </>
  );
}
