import { useHealth } from "~/hooks/health.hook";

import { Skeleton } from "~/components/ui/skeleton";

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
          {loading ? (
            <>
              <Skeleton className="bg-surface-container h-13 w-20" />
              <Skeleton className="bg-surface-container h-3 w-15 mt-1" />
            </>
            ) : (
            <>
              <span className="text-display font-display text-primary">
                {health.uptimePercentage}%
              </span>
                  <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                Uptime ({health.uptimeDays}d)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
