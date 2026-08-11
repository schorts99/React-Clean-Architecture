import { type ValueObject } from "@schorts/shared-kernel";

export abstract class PascalCaseValue implements ValueObject<string> {
  readonly valueType = "PascalCase";
  abstract readonly attributeName: string;

  constructor(readonly value: string) {}

  equals(other: unknown): boolean {
    return (
      other instanceof PascalCaseValue &&
      this.value === other.value
    );
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }

  get isValid(): boolean {
    return /^[A-Z][a-zA-Z0-9]*$/.test(this.value);
  }
}
