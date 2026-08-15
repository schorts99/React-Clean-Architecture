import { useAllInfrastructures } from "~/hooks/all-infrastructures.hook";

import { PageHeader } from "~/components/page-header";
import { HealthCard } from "~/components/infrastructures/health-card";

export function Infrastructures() {
  const { loading, infrastructures } = useAllInfrastructures();

  return (
    <>
      <PageHeader
        title="External Integrations"
        subtitle="Overview of all adapters, third-party services, and external APIs connected to the application core."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        <div className="col-span-1 md:col-span-4">
          <HealthCard />
        </div>
      </div>
    </>
  );
}
