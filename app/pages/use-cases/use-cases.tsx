import { PageHeader } from "~/components/page-header";

export function UseCases() {
  return (
    <>
      <PageHeader
        title="Application Use Cases"
        subtitle="Orchestration of domain logic. These modules dictate the flow of data to and from the entities, and direct those entities to use their Critical Business Rules to achieve the goals of the use case."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">

      </div>
    </>
  );
}
