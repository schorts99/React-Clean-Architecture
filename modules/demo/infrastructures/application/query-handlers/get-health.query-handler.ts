import {
  type Cache as SharedCache,
  type Logger,
  AbstractQueryHandler,
} from "@schorts/shared-kernel";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../../../di/types";

import type { GetHealthQuery } from "../queries";
import type { GetHealthQueryResultDto } from "../dtos";

@injectable()
export class GetHealthQueryHandler extends AbstractQueryHandler<
  GetHealthQuery,
  GetHealthQueryResultDto
> {
  constructor(
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

  async execute(_query: GetHealthQuery): Promise<GetHealthQueryResultDto> {
    return {
      uptimeDays: 0,
      uptimePercentage: 100,
    };
  }

  override getCacheKey(query: GetHealthQuery): string {
    const primitives = query.toPrimitives();

    return `${query.getType()}:${JSON.stringify({
      version: primitives.version,
      type: primitives.type,
      payload: primitives.payload,
    })}`;
  }

  override getCacheTags(): string[] {
    return ["health"];
  }
}
