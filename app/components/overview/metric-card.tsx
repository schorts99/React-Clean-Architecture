import { type LucideIcon } from "lucide-react";

export function MetricCard({
  Icon,
  label,
  value,
 subtitle,
  className = "",
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
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
          <p className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary">
            {value}
          </p>
          <span className="text-label-md font-label-md text-outline md:hidden">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
