import { Entity } from "@schorts/shared-kernel";

import type { InfrastructurePrimitives } from "../types";

import {
  IdValue,
  TypeValue,
  DescriptionValue,
  NameValue,
} from "../value-objects";

export class InfrastructureEntity extends Entity<IdValue, InfrastructurePrimitives> {
  constructor(
    id: IdValue,
    readonly type: TypeValue,
    readonly name: NameValue,
    readonly description: DescriptionValue,
  ) {
    super(id);
  }

  toPrimitives(): InfrastructurePrimitives {
    return {
      id: this.id.value,
      type: this.type.value,
      name: this.name.value,
      description: this.description.value,
    };
  }

  static fromPrimitives(primitives: InfrastructurePrimitives): InfrastructureEntity {
    return new InfrastructureEntity(
      new IdValue(primitives.id),
      new TypeValue(primitives.type),
      new NameValue(primitives.name),
      new DescriptionValue(primitives.description),
    );
  }
}
