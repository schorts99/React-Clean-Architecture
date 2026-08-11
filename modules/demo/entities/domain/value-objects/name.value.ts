import { PascalCaseValue } from "../../../../shared/value-objects";

export class NameValue extends PascalCaseValue {
  readonly attributeName = "name";

  constructor(value: string) {
    super(value);
  }
}
