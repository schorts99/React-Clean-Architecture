import { Network, DraftingCompass, EthernetPort } from "lucide-react";

import { PageHeader } from "~/components/page-header";
import { MetricCard } from "~/components/overview/metric-card";

export function Overview() {
  return (
    <>
      <PageHeader
        title="Architecture Overview"
        subtitle="High-level summary of your project's structural components · V1.0.0"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-md md:gap-lg mb-xl md:mb-xxl">
        <MetricCard
          Icon={Network}
          label="Total Entities"
          value="24"
          subtitle="models defined"
          className="min-h-35"
        />

        <div className="grid grid-cols-2 md:contents gap-md">
          <MetricCard
            Icon={DraftingCompass}
            label="Use Cases"
            value="12"
            subtitle="active flows"
          />
          <MetricCard
            Icon={EthernetPort}
            label="Providers"
            value="3"
            subtitle="infrastructure"
          />
        </div>
      </div>
    </>
  );
}
