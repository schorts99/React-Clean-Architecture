import { ArrayValue, rule } from "@schorts/shared-kernel";

import type { EntityPrimitives } from "../types";

const SCHEMA = {
  name: [rule({ required: true }), rule({ type: 'string' })],
  fields: {
    _: {
      name: [
        { required: true },
        { type: "string" },
      ],
      type: [
        { required: true },
        { type: "string" },
      ],
    },
  },
};

export class FieldsValue extends ArrayValue<EntityPrimitives["fields"][number]> {
  readonly attributeName = "fields";
  readonly isPrimitive = false;

  constructor(value: EntityPrimitives["fields"]) {
    super(value, SCHEMA);
  }
}
