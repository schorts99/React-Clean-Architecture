export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-xl">
      <h1 className="text-headline-lg-mobile md:text-display font-headline-lg-mobile md:font-display text-primary mb-xs">
        {title}
      </h1>
      <p className="text-body-md md:text-body-lg font-body-md md:font-body-lg text-on-surface-variant">
        {subtitle}
      </p>
    </div>
  );
}
