import { useHealth } from "~/hooks/health.hook";

export function HealthCard() {
  const { loading, health } = useHealth();

  return (
    <div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant rounded-xl p-lg flex flex-col justify-between min-h-[200px] h-full">
      <div>
        <h3 className="text-headline-sm font-headline-sm text-primary mb-1">
          System Health
        </h3>
        <p className="text-label-md font-label-md text-on-surface-variant">
          All primary adapters operational.
        </p>
      </div>

      <div className="flex items-end justify-between mt-xl">
        <div className="flex flex-col">
          <span className="text-display font-display text-primary">

          </span>
          <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">

          </span>
        </div>
      </div>
    </div>
  );
}
