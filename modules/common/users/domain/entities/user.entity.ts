import { Entity } from "@schorts/shared-kernel";

import type { UserPrimitives } from "../types";

import { IDValue, NameValue } from "../value-objects";

export class UserEntity extends Entity<IDValue, UserPrimitives> {
  constructor(
    id: IDValue,
    readonly name: NameValue,
  ) {
    super(id);
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }

  static fromPrimitives(primitives: UserPrimitives): UserEntity {
    return new UserEntity(
      new IDValue(primitives.id),
      new NameValue(primitives.name),
    );
  }
}
