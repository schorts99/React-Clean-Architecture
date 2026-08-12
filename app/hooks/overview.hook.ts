import { useState, useEffect, useContext } from "react";

import { CQRSContext } from "~/contexts";

import type { GetOverviewQueryResultDto } from "../../modules/demo/overview/application/dtos";
import { GetOverviewQuery } from "../../modules/demo/overview/application/queries";

export function useOverview() {
  const { queryBus } = useContext(CQRSContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [overview, setOverview] = useState<GetOverviewQueryResultDto>({
    entitiesCount: 0,
    infrastructuresCount: 0,
    useCasesCount: 0,
  });

  useEffect(() => {
    const getOverviewQuery = new GetOverviewQuery(crypto.randomUUID());

    queryBus
      .dispatch<GetOverviewQuery, GetOverviewQueryResultDto>(getOverviewQuery)
      .then(setOverview)
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    overview,
  };
}
