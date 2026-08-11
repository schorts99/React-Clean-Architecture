import { inject, injectable } from "inversify";

import { TYPES } from "../../../../../../di/types";

import type { EntityDao } from "../../../../entities/infrastructure/database/interfaces";
import type { UseCaseDao } from "../../../../use-cases/infrastructure/database/interfaces";
import type { InfrastructureDao } from "../../../../infrastructures/infrastructure/database/interfaces";

import type { OverviewQueryService } from "../../../application/services";

@injectable()
export class OverviewDatabaseQueryService implements OverviewQueryService {
  constructor(
    @inject(TYPES.ENTITY_DAO)
    private readonly entityDao: EntityDao,
    @inject(TYPES.USE_CASE_DAO)
    private readonly useCaseDao: UseCaseDao,
    @inject(TYPES.INFRASTRUCTURE_DAO)
    private readonly infrastructureDao: InfrastructureDao,
  ) {}

  async getCounts(): Promise<{ entitiesCount: number; useCasesCount: number; infrastructuresCount: number }> {
    const [entitiesCount, useCasesCount, infrastructuresCount] = await Promise.all([
      this.entityDao.count(),
      this.useCaseDao.count(),
      this.infrastructureDao.count(),
    ]);

    return {
      entitiesCount,
      infrastructuresCount,
      useCasesCount,
    };
  }
}
