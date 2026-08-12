import { createContext, type ReactNode, useContext, useMemo } from "react";
import { InMemoryQueryBus, type QueryBus } from "@schorts/shared-kernel";

import { DependencyInjectionContext } from "~/contexts/dependency-injection.context";

import { GetOverviewQuery } from "../../modules/demo/overview/application/queries";
import { type GetOverviewQueryHandler } from "../../modules/demo/overview/application/query-handlers";

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
