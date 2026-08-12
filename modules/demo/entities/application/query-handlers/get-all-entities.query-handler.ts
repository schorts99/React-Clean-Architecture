import {
  type Cache as SharedCache,
  type Logger,
  AbstractQueryHandler,
} from "@schorts/shared-kernel";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../../../di/types";

import  { type GetAllEntitiesQuery } from "../queries";
import type { GetAllEntitiesQueryResultDto } from "../dtos";
import type { EntityDao } from "../interfaces";

@injectable()
export class GetAllEntitiesQueryHandler extends AbstractQueryHandler<
  GetAllEntitiesQuery,
  GetAllEntitiesQueryResultDto
> {
  constructor(
    @inject(TYPES.CACHE)
    cacheStore: SharedCache,
    @inject(TYPES.LOGGER)
    logger: Logger,
    @inject(TYPES.ENTITY_DAO)
    private readonly entityDao: EntityDao,
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

  async execute(_query: GetAllEntitiesQuery): Promise<GetAllEntitiesQueryResultDto> {
    const entityEntities = await this.entityDao.getAll();

    return entityEntities.map((entity) => entity.toPrimitives());
  }

  override getCacheKey(query: GetAllEntitiesQuery): string {
    const primitives = query.toPrimitives();

    return `${query.getType()}:${JSON.stringify({
      version: primitives.version,
      type: primitives.type,
      payload: primitives.payload,
    })}`;
  }

  override getCacheTags(): string[] {
    return ["entities"];
  }
}
