import {
  type Cache as SharedCache,
  type Logger,
  AbstractQueryHandler,
} from "@schorts/shared-kernel";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../../../di/types";

import  { type GetOverviewQuery } from "../queries";
import type { GetOverviewQueryResultDto } from "../dtos";
import type { OverviewQueryService } from "../services";

@injectable()
export class GetOverviewQueryHandler extends AbstractQueryHandler<
  GetOverviewQuery,
  GetOverviewQueryResultDto
> {
  constructor(
    @inject(TYPES.OVERVIEW_QUERY_SERVICE)
    private readonly queryService: OverviewQueryService,
    @inject(TYPES.CACHE)
    cacheStore: SharedCache,
    @inject(TYPES.LOGGER)
    logger: Logger,
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
    return await this.queryService.getCounts();
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
