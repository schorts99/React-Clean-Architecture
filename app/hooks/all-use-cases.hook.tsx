import { useState, useEffect, useContext } from "react";

import { CQRSContext } from "~/contexts";

import type { GetAllUseCasesQueryResultDto } from "../../modules/demo/use-cases/application/dtos";
import { GetAllUseCasesQuery } from "../../modules/demo/use-cases/application/queries";

export function useAllUseCases() {
  const { queryBus } = useContext(CQRSContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [useCases, setUseCases] = useState<GetAllUseCasesQueryResultDto>([]);

  useEffect(() => {
    const getAllUseCasesQuery = new GetAllUseCasesQuery(crypto.randomUUID());

    queryBus
      .dispatch<GetAllUseCasesQuery, GetAllUseCasesQueryResultDto>(getAllUseCasesQuery)
      .then(setUseCases)
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    useCases,
  };
}
