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
          id: "d398c192-4b7d-4b11-a076-0af12c627aed",
          name: "OverviewQuery",
          description: "Retrieves an overview of the entities, use cases, and infrastructures configured in the application.",
          type: "QUERY",
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
            {
              name: "Cache",
            },
            {
              name: "Logger",
            },
          ],
        }),
      ];

      await this.useCaseDao.saveMany(useCases);
    }

    return false;
  }
}
