import { AbstractQuery, type QueryMetadata } from "@schorts/shared-kernel";

export class GetOverviewQuery extends AbstractQuery<null> {
  static readonly type = "demo.overview.get.v1.get_overview";

  constructor(
    correlationId: string,
    customMetadata?: Partial<QueryMetadata>,
  ) {
    super(correlationId, null, customMetadata);
  }

  getType(): string {
    return GetOverviewQuery.type;
  }
}
