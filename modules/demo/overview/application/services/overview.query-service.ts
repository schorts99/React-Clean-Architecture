export interface OverviewQueryService {
  getCounts(): Promise<{
    entitiesCount: number;
    useCasesCount: number;
    infrastructuresCount: number;
  }>;
}
