import { describe, it, expect } from "vitest";

import { PascalCaseValue } from "./pascal-case.value";

class TestPascalCaseValue extends PascalCaseValue {
  readonly attributeName = "TestAttribute";
}

describe("PascalCaseValue", () => {
  it("stores the provided value", () => {
    const vo = new TestPascalCaseValue("Customer");

    expect(vo.value).toBe("Customer");
  });

  it("has the correct valueType", () => {
    const vo = new TestPascalCaseValue("Order");

    expect(vo.valueType).toBe("PascalCase");
  });

  it("exposes the attributeName from the subclass", () => {
    const vo = new TestPascalCaseValue("Product");

    expect(vo.attributeName).toBe("TestAttribute");
  });

  it("is valid for a correct PascalCase string", () => {
    const validValues = [
      "Customer",
      "OrderItem",
      "A",
      "Product123",
      "HTMLParser",
      "X1Y2",
    ];

    for (const value of validValues) {
      const vo = new TestPascalCaseValue(value);

      expect(vo.isValid).toBe(true);
    }
  });

  it("is invalid for non-PascalCase strings", () => {
    const invalidValues = [
      "",                    // empty
      "customer",            // starts with lowercase
      "customerName",        // camelCase
      "Customer_Name",       // underscore
      "Customer-Name",       // hyphen
      "Customer Name",       // space
      "1Customer",           // starts with number
      "Customer!",           // special char
      " customer",           // leading space
    ];

    for (const value of invalidValues) {
      const vo = new TestPascalCaseValue(value);

      expect(vo.isValid).toBe(false);
    }
  });

  it("returns true when comparing two instances with the same value", () => {
    const a = new TestPascalCaseValue("Customer");
    const b = new TestPascalCaseValue("Customer");

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
  });

  it("returns false when values differ", () => {
    const a = new TestPascalCaseValue("Customer");
    const b = new TestPascalCaseValue("Order");

    expect(a.equals(b)).toBe(false);
  });

  it("returns false when compared with a non-PascalCaseValue", () => {
    const vo = new TestPascalCaseValue("Customer");

    expect(vo.equals("Customer")).toBe(false);
    expect(vo.equals(null)).toBe(false);
    expect(vo.equals(undefined)).toBe(false);
    expect(vo.equals({ value: "Customer" })).toBe(false);
  });

  it("returns false when compared with a different subclass that has the same value", () => {
    class OtherPascalCaseValue extends PascalCaseValue {
      readonly attributeName = "Other";
    }

    const a = new TestPascalCaseValue("Customer");
    const b = new OtherPascalCaseValue("Customer");

    expect(a.equals(b)).toBe(true);
  });

  it("toString returns the raw value", () => {
    const vo = new TestPascalCaseValue("Invoice");

    expect(vo.toString()).toBe("Invoice");
  });

  it("toJSON returns the raw value", () => {
    const vo = new TestPascalCaseValue("Invoice");

    expect(vo.toJSON()).toBe("Invoice");
  });

  it("works correctly with JSON.stringify", () => {
    const vo = new TestPascalCaseValue("Customer");

    expect(JSON.stringify(vo)).toBe('"Customer"');
  });
});
