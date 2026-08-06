export interface JWTDecoder {
  decode(jwt: string): Record<string, any>;
}
