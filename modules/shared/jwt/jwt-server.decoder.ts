import { injectable } from "inversify";

import { type JWTDecoder } from "./jwt.decoder";

@injectable()
export class JWTServerDecoder implements JWTDecoder {
  decode<T = unknown>(jwt: string): T {
    const [, payload] = jwt.split(".");
    const decoded = Buffer
      .from(payload, "base64")
      .toString("utf-8");

    return JSON.parse(decoded);
  }
}
