import { ArrayValue, rule } from "@schorts/shared-kernel";

import type { UseCasePrimitives } from "../types";

const SCHEMA = {
  name: [rule({ required: true }), rule({ type: 'string' })],
};

export class DependenciesValue extends ArrayValue<UseCasePrimitives["dependencies"][number]> {
  readonly attributeName = "dependencies";
  readonly isPrimitive = false;

  constructor(value: UseCasePrimitives["dependencies"]) {
    super(value, SCHEMA);
  }
}
