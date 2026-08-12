import { EnumValue } from "@schorts/shared-kernel";

const ALLOWED_VALUES = ["QUERY", "QUERY_SERVICE"] as const;

export class TypeValue extends EnumValue<typeof ALLOWED_VALUES> {
  readonly attributeName = "type";

  constructor(value: typeof ALLOWED_VALUES[number]) {
    super(ALLOWED_VALUES, value);
  }
}
