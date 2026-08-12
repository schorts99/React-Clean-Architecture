import { useState, useEffect, useContext } from "react";

import { CQRSContext } from "~/contexts";

import type { GetAllEntitiesQueryResultDto } from "../../modules/demo/entities/application/dtos";
import { GetAllEntitiesQuery } from "../../modules/demo/entities/application/queries";

export function useAllEntities() {
  const { queryBus } = useContext(CQRSContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [entities, setEntities] = useState<GetAllEntitiesQueryResultDto>([]);

  useEffect(() => {
    const getAllEntitiesQuery = new GetAllEntitiesQuery(crypto.randomUUID());

    queryBus
      .dispatch<GetAllEntitiesQuery, GetAllEntitiesQueryResultDto>(getAllEntitiesQuery)
      .then(setEntities)
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    entities,
  };
}
