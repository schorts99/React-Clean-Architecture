import { type LucideIcon } from "lucide-react";

import { Skeleton } from "~/components/ui/skeleton";

export function MetricCard({
  Icon,
  label,
  value,
  subtitle,
  loading,
  className = "",
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
  loading: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "bg-surface-container-lowest border border-outline-variant rounded-xl",
        "p-md md:p-lg hover:shadow-card transition-shadow duration-300",
        "flex flex-col justify-between min-h-30 md:min-h-0",
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-between mb-sm md:mb-xl">
        <Icon className="text-secondary h-5 md:h-[24px] w-5 md:w-[24px]" />
      </div>

      <div>
        <p className="text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider md:normal-case md:tracking-normal line-clamp-1">
          {label}
        </p>
        <div className="flex items-baseline gap-sm">
          {loading ? (
            <Skeleton className="h-9 w-10 bg-surface-container" />
            ) : (
            <p className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary">
              {value}
            </p>
          )}
          <span className="text-label-md font-label-md text-outline md:hidden">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
