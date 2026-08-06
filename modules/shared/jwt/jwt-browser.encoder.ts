import { injectable } from "inversify";

import type { JWTEncoder, Header, Payload } from "./jwt.encoder";

@injectable()
export class JWTBrowserEncoder implements JWTEncoder {
  constructor(
    private readonly header: Header = { alg: "none", type: "JWT" },
    private readonly signature: string = "dummy-signature",
    private readonly ttlInSeconds: number = 3600,
  ) {}

  encode(payload: Payload): string {
    return `${this.toBase64URL(this.header)}.${this.toBase64URL({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.ttlInSeconds,
    })}.${this.signature}`;
  }

  private toBase64URL(obj: Record<string, any>) {
    const str = JSON.stringify(obj);

    return btoa(str)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }
}
