import type { UseCaseDao } from "../../../application/interfaces";

import { UseCaseEntity } from "../../../domain/entities";

import type { Seeder } from "../../../../../shared/data";

export class UseCasesSeeder implements Seeder {
  constructor(
    private readonly useCaseDao: UseCaseDao,
  ) {}

  async seed(): Promise<boolean> {
    const useCasesCount = await this.useCaseDao.count();

    if (useCasesCount === 0) {
      const useCases: UseCaseEntity[] = [
        UseCaseEntity.fromPrimitives({
          id: "24cfeeef-600d-4d0f-ab22-762512e0081e",
          name: "GetOverviewQuery",
          description: "Represents a request to retrieve the application overview.",
          type: "QUERY",
          dependencies: [
            {
              name: "OverviewQueryService",
            },
          ],
        }),
        UseCaseEntity.fromPrimitives({
          id: "d398c192-4b7d-4b11-a076-0af12c627aed",
          name: "OverviewQueryService",
          description: "Reads and aggregates application data from entities and infrastructure components to provide the application overview.",
          type: "QUERY_SERVICE",
          dependencies: [
            {
              name: "EntityDao",
            },
            {
              name: "UseCaseDao",
            },
            {
              name: "InfrastructureDao",
            },
          ],
        }),
      ];

      await this.useCaseDao.saveMany(useCases);
    }

    return false;
  }
}
