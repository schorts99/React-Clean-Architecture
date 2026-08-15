import { useContext, useState, useEffect } from "react";

import { CQRSContext } from "~/contexts";

import type { GetAllInfrastructuresQueryResultDto } from "../../modules/demo/infrastructures/application/dtos";
import { GetAllInfrastructuresQuery } from "../../modules/demo/infrastructures/application/queries";

export function useAllInfrastructures() {
  const { queryBus } = useContext(CQRSContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [infrastructures, setInfrastructures] = useState<GetAllInfrastructuresQueryResultDto>([]);

  useEffect(() => {
    const getAllInfrastructuresQuery = new GetAllInfrastructuresQuery(crypto.randomUUID());

    queryBus
      .dispatch<GetAllInfrastructuresQuery, GetAllInfrastructuresQueryResultDto>(
        getAllInfrastructuresQuery,
      )
      .then(setInfrastructures)
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    infrastructures,
  };
}
