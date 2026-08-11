import { AbstractQueryHandler } from "@schorts/shared-kernel";

import type { GetOverviewQuery } from "../queries";
import type { GetOverviewQueryResultDto } from "../dtos";
import type { OverviewQueryService } from "../services";

export class GetOverviewQueryHandler extends AbstractQueryHandler<
  GetOverviewQuery,
  GetOverviewQueryResultDto
> {
  constructor() {
    super({});
  }

  async execute(_query: GetOverviewQuery): Promise<GetOverviewQueryResultDto> {
    return {
      entitiesCount: 0,
      infrastructuresCount: 0,
      useCasesCount: 0,
    };
  }

  getCacheTags(): string[] {
    return ["overview"];
  }
}
