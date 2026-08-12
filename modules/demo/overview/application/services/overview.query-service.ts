import type { GetOverviewQueryResultDto } from "../dtos";

export interface OverviewQueryService {
  getCounts(): Promise<GetOverviewQueryResultDto>;
}
