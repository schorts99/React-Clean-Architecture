import { AbstractQuery, type QueryMetadata } from "@schorts/shared-kernel";

export class GetAllEntitiesQuery extends AbstractQuery<null> {
  static readonly type ="demo.entities.get.v1.get_all_entities";

  constructor(
    correlationId: string,
    customMetadata?: Partial<QueryMetadata>,
  ) {
    super(correlationId, null, customMetadata);
  }

  getType(): string {
    return GetAllEntitiesQuery.type;
  }
}
