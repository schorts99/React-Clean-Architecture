import {
  type Cache as SharedCache,
  type Logger,
  AbstractQueryHandler,
} from "@schorts/shared-kernel";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../../../di/types";

import  { type GetAllUseCasesQuery } from "../queries";
import type { GetAllUseCasesQueryResultDto } from "../dtos";
import type { UseCaseDao } from "../interfaces";

@injectable()
export class GetAllUseCasesQueryHandler extends AbstractQueryHandler<
  GetAllUseCasesQuery,
  GetAllUseCasesQueryResultDto
> {
  constructor(
    @inject(TYPES.CACHE)
    cacheStore: SharedCache,
    @inject(TYPES.LOGGER)
    logger: Logger,
    @inject(TYPES.USE_CASE_DAO)
    private readonly useCaseDao: UseCaseDao,
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

  async execute(): Promise<GetAllUseCasesQueryResultDto> {
    const useCaseEntities = await this.useCaseDao.getAll();

    return useCaseEntities.map((useCase) => useCase.toPrimitives());
  }

  override getCacheKey(query: GetAllUseCasesQuery): string | null {
    const primitives = query.toPrimitives();

    return `${query.getType()}:${JSON.stringify({
      version: primitives.version,
      type: primitives.type,
      payload: primitives.payload,
    })}`;
  }

  override getCacheTags(): string[] {
    return ["use_cases"];
  }
}
