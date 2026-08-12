import { AbstractQuery, type QueryMetadata } from "@schorts/shared-kernel";

export class GetAllUseCasesQuery extends AbstractQuery<null> {
  static readonly type ="demo.use_cases.get.v1.get_all_use_cases";

  constructor(
    correlationId: string,
    customMetadata?: Partial<QueryMetadata>,
  ) {
    super(correlationId, null, customMetadata);
  }

  getType(): string {
    return GetAllUseCasesQuery.type;
  }
}
