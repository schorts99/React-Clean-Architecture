import { Network, DraftingCompass, EthernetPort } from "lucide-react";

import { useOverview } from "~/hooks";

import { PageHeader } from "~/components/page-header";
import { MetricCard } from "~/components/overview/metric-card";

export function Overview() {
  const { loading, overview } = useOverview();

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
          value={overview.entitiesCount.toString()}
          subtitle="models defined"
          loading={loading}
          className="min-h-35"
        />

        <div className="grid grid-cols-2 md:contents gap-md">
          <MetricCard
            Icon={DraftingCompass}
            label="Use Cases"
            value={overview.useCasesCount.toString()}
            loading={loading}
            subtitle="active flows"
          />
          <MetricCard
            Icon={EthernetPort}
            label="Providers"
            value={overview.infrastructuresCount.toString()}
            loading={loading}
            subtitle="infrastructure"
          />
        </div>
      </div>
    </>
  );
}
