import { ArrayValue, rule } from "@schorts/shared-kernel";

import type { EntitySchema } from "../../../../../schemas";

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

export class FieldsValue extends ArrayValue<EntitySchema["fields"][number]> {
  readonly attributeName = "fields";
  readonly isPrimitive = false;

  constructor(value: EntitySchema["fields"]) {
    super(value, SCHEMA);
  }
}
