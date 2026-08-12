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
        UseCaseEntity.fromPrimitives({
          id: "bbdab9d2-1bf3-4ed1-b17d-7079af2d9cf6",
          name: "GetAllEntitiesQuery",
          description: "Retrieves all entities configured in the application.",
          type: "QUERY",
          dependencies: [
            {
              name: "EntityDao",
            },
            {
              name: "Cache",
            },
            {
              name: "Logger",
            },
          ],
        }),
        UseCaseEntity.fromPrimitives({
          id: "fbcbb821-739f-4f8d-8bf8-4f8741908c63",
          name: "GetAllUseCasesQuery",
          description: "Retrieves all use cases configured in the application.",
          type: "QUERY",
          dependencies: [
            {
              name: "UseCaseDao",
            },
            {
              name: "Cache",
            },
            {
              name: "Logger",
            },
          ],
        }),
        UseCaseEntity.fromPrimitives({
          id: "a3a38d60-b1e6-4919-bcbd-12f3750cc39e",
          name: "GetAllInfrastructuresQuery",
          description: "Retrieves all infrastructure components configured in the application.",
          type: "QUERY",
          dependencies: [
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
