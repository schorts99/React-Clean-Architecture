import { AbstractQuery, type QueryMetadata } from "@schorts/shared-kernel";

export class GetHealthQuery extends AbstractQuery<null> {
  static readonly type ="demo.infrastructures.get.v1.get_health";

  constructor(
    correlationId: string,
    customMetadata?: Partial<QueryMetadata>,
  ) {
    super(correlationId, null, customMetadata);
  }

  getType(): string {
    return GetHealthQuery.type;
  }
}
