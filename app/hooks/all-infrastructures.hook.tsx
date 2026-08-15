import { useState } from "react";

import type { GetAllInfrastructuresQueryResultDto } from "../../modules/demo/infrastructures/application/dtos";

export function useAllInfrastructures() {
  const [loading, setLoading] = useState<boolean>(true);
  const [infrastructures, setInfrastructures] = useState<GetAllInfrastructuresQueryResultDto>([]);

  return {
    loading,
    infrastructures,
  };
}
