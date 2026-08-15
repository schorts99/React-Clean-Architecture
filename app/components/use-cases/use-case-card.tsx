import type { GetAllUseCasesQueryResultDto } from "../../../modules/demo/use-cases/application/dtos";

export function UseCaseCard({ useCase }: { useCase: GetAllUseCasesQueryResultDto[number] }) {
  return (
    <div
      className={[
        "bg-surface-container-lowest border border-outline-variant rounded-xl p-lg",
        "relative overflow-hidden group hover:border-secondary transition-colors duration-300",
        "shadow-sm hover:shadow-card flex flex-col h-full",
      ].join(" ")}
    >
      <div className="flex justify-between items-start mb-md flex-wrap gap-y-2">
        <div className="flex items-center gap-sm flex-wrap">
          <h3 className="text-headline-sm font-headline-sm text-on-surface">
            {useCase.name}
          </h3>
        </div>

        <span
          className={[
            "px-2 py-1 rounded text-[10px] font-code tracking-wider",
            useCase.type === "QUERY"
              ? "bg-surface-container text-on-surface-variant"
              : "bg-primary/5 border border-primary/10 text-primary font-bold"
          ].join(" ")}
        >
          {useCase.type}
        </span>
      </div>

      <div className="mb-md">
        <p className="text-body-md font-body-md text-on-surface-variant">
          {useCase.description}
        </p>
      </div>

      <div className="text-label-md font-label-md text-on-surface-variant mb-xs">
        Dependencies:
      </div>
      <div className="flex flex-col gap-xs">
        {useCase.dependencies.map((dependency) => (
          <div
            key={dependency.name}
            className="flex items-center gap-2 p-2 rounded bg-surface-container-low border border-surface-variant"
          >
            <span className="font-code text-xs text-on-surface">
              {dependency.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
