import { AbstractQuery, type QueryMetadata } from "@schorts/shared-kernel";

export class GetAllInfrastructuresQuery extends AbstractQuery {
  static readonly type ="demo.infrastructures.get.v1.get_all_infrastructures";

  constructor(
    correlationId: string,
    customMetadata?: Partial<QueryMetadata>,
  ) {
    super(correlationId, null, customMetadata);
  }

  getType(): string {
    return GetAllInfrastructuresQuery.type;
  }
}
