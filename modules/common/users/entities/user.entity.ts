import { Entity } from "@schorts/shared-kernel";

import type { UserModel } from "../../../../models";

import { IDValue, NameValue } from "../value-objects";

export class UserEntity extends Entity<IDValue, UserModel> {
  constructor(
    id: IDValue,
    readonly name: NameValue,
  ) {
    super(id);
  }

  toPrimitives(): UserModel {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }

  static fromPrimitives(model: UserModel): UserEntity {
    return new UserEntity(
      new IDValue(model.id as string),
      new NameValue(model.name),
    );
  }
}
