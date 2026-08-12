import type { InfrastructureDao } from "../interfaces";

import { InfrastructureEntity } from "../../../domain/entities";

import type { Seeder } from "../../../../../shared/data";

export class InfrastructuresSeeder implements Seeder {
  constructor(
    private readonly infrastructureDao: InfrastructureDao,
  ) {}

  async seed(): Promise<boolean> {
    const infrastructuresCount = await this.infrastructureDao.count();

    if (infrastructuresCount === 0) {
      const infrastructures: InfrastructureEntity[] = [
        InfrastructureEntity.fromPrimitives({
          id: "3825d913-9d67-40d3-a0e9-2d28cd632cad",
          type: "PERSISTENCE",
          name: "IndexedDB",
          description: "Browser persistence storage used to store and retrieve application data locally.",
        }),
        InfrastructureEntity.fromPrimitives({
          id: "a8ba79c0-b8f4-44fd-bbb2-9fe17d66be42",
          type: "PERSISTENCE",
          name: "Cache",
          description: "Browser cache used to temporarily store data for faster access and reduce unnecessary data retrieval.",
        }),
      ];

      await this.infrastructureDao.saveMany(infrastructures);
    }

    return false;
  }
}
