import { useContext, useState, useEffect } from "react";

import { CQRSContext } from "~/contexts";

import type { GetHealthQueryResultDto } from "../../modules/demo/infrastructures/application/dtos";
import { GetHealthQuery } from "../../modules/demo/infrastructures/application/queries";

export function useHealth() {
  const { queryBus } = useContext(CQRSContext);
  const [health, setHealth] = useState<GetHealthQueryResultDto>({
    uptimeDays: 0,
    uptimePercentage:0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getHealthQuery = new GetHealthQuery(crypto.randomUUID());

    queryBus
      .dispatch<GetHealthQuery, GetHealthQueryResultDto>(getHealthQuery)
      .then(setHealth)
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    health,
  };
}
