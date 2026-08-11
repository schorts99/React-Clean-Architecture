import { Entity } from "@schorts/shared-kernel"

import type { EntityPrimitives } from "../types";

import {
  FieldsValue,
  NameValue,
  IdValue,
  TypeValue,
  DescriptionValue,
} from "../value-objects";

export class EntityEntity extends Entity<IdValue, EntityPrimitives> {
  constructor(
    id: IdValue,
    readonly type: TypeValue,
    readonly name: NameValue,
    readonly description: DescriptionValue,
    readonly fields: FieldsValue,
  ) {
    super(id);
  }

  toPrimitives(): EntityPrimitives {
    return {
      id: this.id.value,
      type: this.type.value,
      name: this.name.value,
      description: this.description.value,
      fields: this.fields.value,
    };
  }

  static fromPrimitives(primitives: EntityPrimitives): EntityEntity {
    return new EntityEntity(
      new IdValue(primitives.id),
      new TypeValue(primitives.type),
      new NameValue(primitives.name),
      new DescriptionValue(primitives.description),
      new FieldsValue(primitives.fields),
    );
  }
}
