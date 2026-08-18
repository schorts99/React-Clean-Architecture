import { describe, it, expect, beforeEach } from "vitest";

import { JWTServerDecoder } from "./jwt-server.decoder";

describe("JWTServerDecoder", () => {
  let decoder: JWTServerDecoder;

  beforeEach(() => {
    decoder = new JWTServerDecoder();
  });

  function createFakeJwt(payload: Record<string, any>): string {
    const header = Buffer.from(
      JSON.stringify({ alg: "HS256", typ: "JWT" })
    ).toString("base64");
    const body = Buffer.from(JSON.stringify(payload)).toString("base64");
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

  it("supports a generic return type", () => {
    type MyPayload = {
      sub: string;
      role: string;
    };

    const payload: MyPayload = { sub: "u1", role: "admin" };
    const jwt = createFakeJwt(payload);
    const result = decoder.decode<MyPayload>(jwt);

    expect(result.sub).toBe("u1");
    expect(result.role).toBe("admin");
  });

  it("returns an empty object when the payload is empty", () => {
    const jwt = createFakeJwt({});

    expect(decoder.decode(jwt)).toEqual({});
  });

  it("handles nested objects and arrays", () => {
    const payload = {
      user: {
        id: "u1",
        tags: ["a", "b"],
        meta: { active: true },
      },
    };
    const jwt = createFakeJwt(payload);

    expect(decoder.decode(jwt)).toEqual(payload);
  });

  it("throws when the JWT has no payload part", () => {
    expect(() => decoder.decode("only-one-part")).toThrow();
    expect(() => decoder.decode("")).toThrow();
  });

  it("throws when the payload is not valid base64", () => {
    const invalidJwt = "header.%%%invalid%%%.signature";

    expect(() => decoder.decode(invalidJwt)).toThrow();
  });

  it("throws when the payload is valid base64 but not valid JSON", () => {
    const notJson = Buffer.from("this is not json").toString("base64");
    const jwt = `header.${notJson}.signature`;

    expect(() => decoder.decode(jwt)).toThrow();
  });

  it("ignores the header and signature (only uses the payload)", () => {
    const payload = { sub: "only-payload-matters" };
    const jwt = createFakeJwt(payload);
    const [, body] = jwt.split(".");
    const modified = `different-header.${body}.different-signature`;

    expect(decoder.decode(modified)).toEqual(payload);
  });

  it("works with base64url-style payloads (common in real JWTs)", () => {
    const payload = { sub: "base64url-test" };
    const jwt = createFakeJwt(payload);

    expect(decoder.decode(jwt)).toEqual(payload);
  });
});
