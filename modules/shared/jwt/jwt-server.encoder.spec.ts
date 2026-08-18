import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { JWTServerEncoder } from "./jwt-server.encoder";
import type { Header, Payload } from "./jwt.encoder";

describe("JWTServerEncoder", () => {
  let encoder: JWTServerEncoder;
  const NOW_MS = 1_700_000_000_000;
  const NOW_SEC = Math.floor(NOW_MS / 1000);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW_MS);

    encoder = new JWTServerEncoder();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function decodeBase64Url(segment: string): Record<string, any> {
    return JSON.parse(
      Buffer.from(segment, "base64url").toString("utf-8")
    );
  }

  it("encodes a payload into a 3-part JWT", () => {
    const payload: Payload = { sub: "user-123", role: "admin" };
    const jwt = encoder.encode(payload);
    const parts = jwt.split(".");

    expect(parts).toHaveLength(3);
  });

  it("uses the default header", () => {
    const jwt = encoder.encode({ sub: "u1" });
    const [headerPart] = jwt.split(".");
    const header = decodeBase64Url(headerPart);

    expect(header).toEqual({ alg: "none", type: "JWT" });
  });

  it("adds iat and exp claims", () => {
    const jwt = encoder.encode({ sub: "u1" });
    const [, payloadPart] = jwt.split(".");
    const payload = decodeBase64Url(payloadPart);

    expect(payload.iat).toBe(NOW_SEC);
    expect(payload.exp).toBe(NOW_SEC + 3600);
    expect(payload.sub).toBe("u1");
  });

  it("preserves custom payload fields", () => {
    const payload: Payload = {
      sub: "user-42",
      name: "Alice",
      roles: ["editor", "viewer"],
      meta: { active: true },
    };
    const jwt = encoder.encode(payload);
    const [, payloadPart] = jwt.split(".");
    const decoded = decodeBase64Url(payloadPart);

    expect(decoded.sub).toBe("user-42");
    expect(decoded.name).toBe("Alice");
    expect(decoded.roles).toEqual(["editor", "viewer"]);
    expect(decoded.meta).toEqual({ active: true });
  });

  it("uses a dummy signature by default", () => {
    const jwt = encoder.encode({ sub: "u1" });
    const [, , signature] = jwt.split(".");

    expect(signature).toBe("dummy-signature");
  });

  it("accepts a custom header", () => {
    const customHeader: Header = { alg: "none", type: "JWT" };
    const customEncoder = new JWTServerEncoder(customHeader);
    const jwt = customEncoder.encode({ sub: "u1" });
    const [headerPart] = jwt.split(".");

    expect(decodeBase64Url(headerPart)).toEqual(customHeader);
  });

  it("accepts a custom signature", () => {
    const customEncoder = new JWTServerEncoder(undefined, "my-custom-sig");
    const jwt = customEncoder.encode({ sub: "u1" });
    const [, , signature] = jwt.split(".");

    expect(signature).toBe("my-custom-sig");
  });

  it("accepts a custom TTL", () => {
    const customEncoder = new JWTServerEncoder(undefined, undefined, 7200);
    const jwt = customEncoder.encode({ sub: "u1" });
    const [, payloadPart] = jwt.split(".");
    const payload = decodeBase64Url(payloadPart);

    expect(payload.exp).toBe(NOW_SEC + 7200);
  });

  it("produces base64url (no padding, no + or /)", () => {
    const jwt = encoder.encode({
      sub: "user-with-special-chars-+/",
      data: "a".repeat(100),
    });
    const [header, payload] = jwt.split(".");

    expect(header).not.toMatch(/[+/=]/);
    expect(payload).not.toMatch(/[+/=]/);
  });

  it("works with a minimal payload (only sub)", () => {
    const jwt = encoder.encode({ sub: "minimal" });
    const [, payloadPart] = jwt.split(".");
    const payload = decodeBase64Url(payloadPart);

    expect(payload.sub).toBe("minimal");
    expect(payload.iat).toBeDefined();
    expect(payload.exp).toBeDefined();
  });

  it("can be decoded by the matching server decoder style", () => {
    const original = { sub: "round-trip", role: "tester" };
    const jwt = encoder.encode(original);
    const [, payloadPart] = jwt.split(".");
    const decoded = JSON.parse(
      Buffer.from(payloadPart, "base64url").toString("utf-8")
    );

    expect(decoded.sub).toBe("round-trip");
    expect(decoded.role).toBe("tester");
    expect(decoded.iat).toBe(NOW_SEC);
    expect(decoded.exp).toBe(NOW_SEC + 3600);
  });
});
