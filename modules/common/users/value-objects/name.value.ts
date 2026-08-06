import { StringValue } from "@schorts/shared-kernel";

const MIN_LENGTH = 1;
const MAX_LENGTH = 30;

export class NameValue extends StringValue {
  readonly attributeName = "name";

  constructor(value: string) {
    super(value, MIN_LENGTH, MAX_LENGTH);
  }
}
