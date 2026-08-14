import { createContext, type ReactNode, useContext, useMemo } from "react";
import { InMemoryQueryBus, type QueryBus } from "@schorts/shared-kernel";

import { DependencyInjectionContext } from "~/contexts/dependency-injection.context";

import { GetOverviewQuery } from "../../modules/demo/overview/application/queries";
import type { GetOverviewQueryHandler } from "../../modules/demo/overview/application/query-handlers";
import { GetAllEntitiesQuery } from "../../modules/demo/entities/application/queries";
import type { GetAllEntitiesQueryHandler } from "../../modules/demo/entities/application/query-handlers";
import { GetAllUseCasesQuery } from "../../modules/demo/use-cases/application/queries";
import type { GetAllUseCasesQueryHandler } from "../../modules/demo/use-cases/application/query-handlers";

export const CQRSContext = createContext<{
  queryBus: QueryBus;
}>({
  queryBus: new InMemoryQueryBus(),
});

export function CQRSProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { container, TYPES } = useContext(DependencyInjectionContext);
  const queryBus = useMemo(() => {
    const queryBusInstance = container.get<QueryBus>(TYPES.QUERY_BUS);

    if (typeof window !== "undefined") {
      if (queryBusInstance.getRegisteredTypes().length === 0) {
        queryBusInstance.register(
          GetOverviewQuery.type,
          container.get<GetOverviewQueryHandler>(TYPES.GET_OVERVIEW_QUERY_HANDLER),
        );
        queryBusInstance.register(
          GetAllEntitiesQuery.type,
          container.get<GetAllEntitiesQueryHandler>(TYPES.GET_ALL_ENTITIES_QUERY_HANDLER),
        );
        queryBusInstance.register(
          GetAllUseCasesQuery.type,
          container.get<GetAllUseCasesQueryHandler>(TYPES.GET_ALL_USE_CASES_QUERY_HANDLER),
        );
      }
    }

    return queryBusInstance;
  }, [container])

  return (
    <CQRSContext.Provider value={{ queryBus }}>
      {children}
    </CQRSContext.Provider>
  );
}
