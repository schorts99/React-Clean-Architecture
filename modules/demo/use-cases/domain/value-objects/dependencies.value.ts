import { ArrayValue, rule } from "@schorts/shared-kernel";

import type { UseCaseSchema } from "../../infrastructure/database/schemas";

const SCHEMA = {
  name: [rule({ required: true }), rule({ type: 'string' })],
};

export class DependenciesValue extends ArrayValue<UseCaseSchema["dependencies"][number]> {
  readonly attributeName = "dependencies";
  readonly isPrimitive = false;

  constructor(value: UseCaseSchema["dependencies"]) {
    super(value, SCHEMA);
  }
}
