import { useState } from "react";

import type { GetHealthQueryResultDto } from "../../modules/demo/infrastructures/application/dtos";

export function useHealth() {
  const [health, setHealth] = useState<GetHealthQueryResultDto>({
    uptimeDays: 0,
    uptimePercentage:0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  return {
    loading,
    health,
  };
}
