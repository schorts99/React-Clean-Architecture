import {
  type Cache as SharedCache,
  type Logger,
  AbstractQueryHandler,
} from "@schorts/shared-kernel";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../../../di/types";

import type { GetAllInfrastructuresQuery } from "../queries";
import type { GetAllInfrastructuresQueryResultDto } from "../dtos";
import type { InfrastructureDao } from "../interfaces";

@injectable()
export class GetAllInfrastructuresQueryHandler extends AbstractQueryHandler<
  GetAllInfrastructuresQuery,
  GetAllInfrastructuresQueryResultDto
> {
  constructor(
    @inject(TYPES.CACHE)
    cacheStore: SharedCache,
    @inject(TYPES.LOGGER)
    logger: Logger,
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

  async execute(_query: GetAllInfrastructuresQuery): Promise<GetAllInfrastructuresQueryResultDto> {
    const infrastructureEntities = await this.infrastructureDao.getAll();

    return infrastructureEntities.map((infrastructure) => infrastructure.toPrimitives());
  }

  override getCacheKey(query: GetAllInfrastructuresQuery): string | null {
    const primitives = query.toPrimitives();

    return `${query.getType()}:${JSON.stringify({
      version: primitives.version,
      type: primitives.type,
      payload: primitives.payload,
    })}`;
  }

  override getCacheTags(): string[] {
    return ["infrastructures"];
  }
}
