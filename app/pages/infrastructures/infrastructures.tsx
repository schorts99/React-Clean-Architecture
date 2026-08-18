import { Database } from "lucide-react";

import { useAllInfrastructures } from "~/hooks/all-infrastructures.hook";

import { PageHeader } from "~/components/page-header";
import { HealthCard } from "~/components/infrastructures/health-card";
import {PersistenceAdapterItem} from "~/components/infrastructures/persistence-adapter-item";

export function Infrastructures() {
  const { loading, persistenceAdapters } = useAllInfrastructures();

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

        <div className="col-span-1 md:col-span-8 bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant rounded-xl p-lg">
          <div className="flex justify-between items-center mb-lg pb-md border-b border-surface-container-high">
            <h3 className="text-headline-sm font-headline-sm text-primary flex items-center gap-sm">
              <Database className="h-6 w-6 text-secondary" />
              Persistence Adapters
            </h3>
          </div>

          <div className="space-y-md">
            {loading
              ? null
              : persistenceAdapters.map((persistenceAdapter) => (
                  <PersistenceAdapterItem
                    key={persistenceAdapter.id}
                    infrastructure={persistenceAdapter}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
