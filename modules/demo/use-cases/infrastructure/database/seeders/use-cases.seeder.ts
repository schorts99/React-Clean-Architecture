import type { Seeder } from "../../../../../shared/data";

import type { UseCaseDao } from "../interfaces";

import { UseCaseEntity } from "../../../domain/entities";

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
          description: "",
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
          description: "",
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
