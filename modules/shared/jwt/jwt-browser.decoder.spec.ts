import { describe, it, expect, beforeEach } from "vitest";

import { JWTBrowserDecoder } from "./jwt-browser.decoder";

describe("JWTBrowserDecoder", () => {
  let decoder: JWTBrowserDecoder;

  beforeEach(() => {
    decoder = new JWTBrowserDecoder();
  });

  function createFakeJwt(payload: Record<string, any>): string {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = "fake-signature";

    return `${header}.${body}.${signature}`;
  }

  it("decodes a valid JWT payload", () => {
    const payload = {
      sub: "user-123",
      name: "Alice",
      iat: 1516239022,
      roles: ["admin", "editor"],
    };
    const jwt = createFakeJwt(payload);
    const result = decoder.decode(jwt);

    expect(result).toEqual(payload);
  });

  it("returns an empty object when the payload is empty", () => {
    const jwt = createFakeJwt({});
    const result = decoder.decode(jwt);

    expect(result).toEqual({});
  });

  it("handles nested objects and arrays in the payload", () => {
    const payload = {
      user: {
        id: "u1",
        profile: {
          age: 30,
          tags: ["a", "b"],
        },
      },
    };
    const jwt = createFakeJwt(payload);

    expect(decoder.decode(jwt)).toEqual(payload);
  });

  it("throws when the JWT has less than 2 parts", () => {
    expect(() => decoder.decode("only-one-part")).toThrow();
    expect(() => decoder.decode("")).toThrow();
  });

  it("throws when the payload is not valid base64", () => {
    const invalidJwt = "eyJhbGciOiJIUzI1NiJ9.%%%invalid%%%.signature";

    expect(() => decoder.decode(invalidJwt)).toThrow();
  });

  it("throws when the payload is valid base64 but not valid JSON", () => {
    const notJson = btoa("this is not json");
    const jwt = `header.${notJson}.signature`;

    expect(() => decoder.decode(jwt)).toThrow();
  });

  it("ignores the header and signature (only uses the payload)", () => {
    const payload = { sub: "only-payload-matters" };
    const jwt = createFakeJwt(payload);
    const [_, body] = jwt.split(".");
    const modified = `different-header.${body}.different-signature`;

    expect(decoder.decode(modified)).toEqual(payload);
  });
});
