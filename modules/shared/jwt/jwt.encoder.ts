export type Header = {
  alg: "none",
  type: "JWT",
};

export type Payload = {
  sub: string;
} & Record<string, any>;

export interface JWTEncoder {
  encode(payload: Payload): string;
}
