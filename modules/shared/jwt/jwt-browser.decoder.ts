import { injectable } from "inversify";

import { type JWTDecoder } from "./jwt.decoder";

@injectable()
export class JWTBrowserDecoder implements JWTDecoder {
  decode(jwt: string): Record<string, any> {
    const parts = jwt.split(".");
    const payloadBase64 = parts[1];

    return JSON.parse(window.atob(payloadBase64));
  }
}
