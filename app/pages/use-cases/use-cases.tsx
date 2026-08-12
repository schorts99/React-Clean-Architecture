import { useAllUseCases } from "~/hooks";

import { PageHeader } from "~/components/page-header";
import { UseCaseCard } from "~/components/use-cases/use-case-card";

export function UseCases() {
  const { loading, useCases } = useAllUseCases();

  return (
    <>
      <PageHeader
        title="Application Use Cases"
        subtitle="Orchestration of domain logic. These modules dictate the flow of data to and from the entities, and direct those entities to use their Critical Business Rules to achieve the goals of the use case."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {loading
          ? null
          : useCases.map((useCase) => (
            <UseCaseCard
              key={useCase.id}
            />
          ))}
      </div>
    </>
  );
}
