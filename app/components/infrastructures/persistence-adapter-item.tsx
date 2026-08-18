import type { InfrastructurePrimitives } from "../../../modules/demo/infrastructures/domain/types";

export function PersistenceAdapterItem({
  infrastructure,
}: {
  infrastructure: InfrastructurePrimitives;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md p-md rounded-lg bg-surface-container-lowest border border-surface-container-high hover:shadow-card transition-all">
      <div className="flex items-center gap-md">
        <div>
          <h4 className="text-body-md font-body-md font-semibold text-primary">
            {infrastructure.name}
          </h4>
          <p className="font-code text-code text-on-surface-variant text-[12px]">
            {infrastructure.description}
          </p>
        </div>
      </div>
    </div>
  );
}
