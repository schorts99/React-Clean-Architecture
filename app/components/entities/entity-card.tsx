import type { GetAllEntitiesQueryResultDto } from "../../../modules/demo/entities/application/dtos";

export function EntityCard({ entity }: { entity: GetAllEntitiesQueryResultDto[number] }) {
  return (
    <div
      className={[
        "bg-surface-container-lowest border border-outline-variant rounded-xl p-lg",
        "flex flex-col h-full",
        "hover:shadow-card hover:-translate-y-0.5 transition-all duration-200",
      ].join(" ")}
    >
      <div className="flex justify-between items-start mb-md">
        <div className="flex items-center gap-sm">
          <h3 className="text-headline-sm font-headline-sm text-primary font-bold">
            {entity.name}
          </h3>
        </div>
      </div>

      <p className="text-body-md font-body-md text-on-surface-variant mb-md flex-1">
        {entity.description}
      </p>

      <div className="border-t border-surface-container-highest pt-md mt-auto">
        {entity.fields.map((field) => (
          <div
            key={field.name}
            className="flex justify-between items-center py-xs border-b border-surface-container-highest last:border-0"
          >
            <span className="font-code text-code text-primary">
              {field.name}
            </span>
            <span
              className={[
                "px-sm py-xs rounded text-label-md font-code",
                "bg-surface-container text-on-surface-variant",
              ].join(" ")}
            >
              {field.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
