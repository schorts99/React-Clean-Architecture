import {
  type Cache as SharedCache,
  type Logger,
  AbstractQueryHandler,
} from "@schorts/shared-kernel";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../../../di/types";

import type { GetOverviewQuery } from "../queries";
import type { EntityDao } from "../../../entities/application/interfaces";
import type { UseCaseDao } from "../../../use-cases/application/interfaces";
import type { InfrastructureDao } from "../../../infrastructures/application/interfaces";
import type { GetOverviewQueryResultDto } from "../dtos";

@injectable()
export class GetOverviewQueryHandler extends AbstractQueryHandler<
  GetOverviewQuery,
  GetOverviewQueryResultDto
> {
  constructor(
    @inject(TYPES.CACHE)
    cacheStore: SharedCache,
    @inject(TYPES.LOGGER)
    logger: Logger,
    @inject(TYPES.ENTITY_DAO)
    private readonly entityDao: EntityDao,
    @inject(TYPES.USE_CASE_DAO)
    private readonly useCaseDao: UseCaseDao,
    @inject(TYPES.INFRASTRUCTURE_DAO)
    private readonly infrastructureDao: InfrastructureDao,
  ) {
    super({
      cache: false,
      cacheTtl: 86400000,
      logging: true,
      metrics: true,
      cacheStore,
      logger,
    });
  }

  async execute(_query: GetOverviewQuery): Promise<GetOverviewQueryResultDto> {
    const [entitiesCount, useCasesCount, infrastructuresCount] = await Promise.all([
      this.entityDao.count(),
      this.useCaseDao.count(),
      this.infrastructureDao.count(),
    ]);

    return {
      entitiesCount,
      useCasesCount,
      infrastructuresCount,
    };
  }

  override getCacheKey(query: GetOverviewQuery) {
    const primitives = query.toPrimitives();

    return `${query.getType()}:${JSON.stringify({
      version: primitives.version,
      type: primitives.type,
      payload: primitives.payload,
    })}`;
  }

  override getCacheTags(): string[] {
    return ["overview"];
  }
}
