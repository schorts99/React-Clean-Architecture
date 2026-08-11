import { StringValue } from "@schorts/shared-kernel";

const MIN_LENGTH = 50;
const MAX_LENGTH = 180;

export class DescriptionValue extends StringValue {
  readonly attributeName = "description";

  constructor(value: string) {
    super(value, MIN_LENGTH, MAX_LENGTH);
  }
}
