import { Entity } from "@schorts/shared-kernel";

import type { UseCasePrimitives } from "../types";

import {
  IdValue,
  TypeValue,
  DescriptionValue,
  NameValue,
  DependenciesValue,
} from "../value-objects";

export class UseCaseEntity extends Entity<IdValue, UseCasePrimitives> {
  constructor(
    id: IdValue,
    readonly type: TypeValue,
    readonly name: NameValue,
    readonly description: DescriptionValue,
    readonly dependencies: DependenciesValue,
  ) {
    super(id);
  }

  toPrimitives(): UseCasePrimitives {
    return {
      id: this.id.value,
      type: this.type.value,
      name: this.name.value,
      description: this.description.value,
      dependencies: this.dependencies.value,
    };
  }

  static fromPrimitives(primitives: UseCasePrimitives): UseCaseEntity {
    return new UseCaseEntity(
      new IdValue(primitives.id),
      new TypeValue(primitives.type),
      new NameValue(primitives.name),
      new DescriptionValue(primitives.description),
      new DependenciesValue(primitives.dependencies),
    );
  }
}
