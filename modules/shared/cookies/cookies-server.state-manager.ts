import { StateManager } from "@schorts/shared-kernel";

export class CookieServerStateManager<
  Schema extends Record<string, any>,
> extends StateManager<Schema, true> {
  private readonly cookies = new Headers();

  constructor(
    private readonly request: Request,
    initialState: Schema = {} as Schema,
  ) {
    super(initialState);
  }

  async getValue<Key extends keyof Schema>(key: Key): Promise<Schema[Key]> {
    const cookie = this.request.headers
      .get("cookie")
      ?.split("; ")
      .find(c => c.startsWith(`${String(key)}=`));

    if (!cookie) {
      return undefined as Schema[Key];
    }

    const value = JSON.parse(
      decodeURIComponent(cookie.split("=")[1]),
    ) as Schema[Key];
    this.state[key] = value;

    return value;
  }

  async setValue<Key extends keyof Schema>(
    key: Key,
    value: Schema[Key],
  ): Promise<void> {
    this.cookies.append(
      "Set-Cookie",
      `${String(key)}=${encodeURIComponent(JSON.stringify(value))}; Path=/; HttpOnly; SameSite=Lax`,
    );

    this.state[key] = value;

    this.notifyListeners();
  }

  async removeValue<Key extends keyof Schema>(key: Key): Promise<void> {
    this.cookies.append(
      "Set-Cookie",
      `${String(key)}=; Max-Age=0; Path=/; HttpOnly`,
    );

    delete this.state[key];

    this.notifyListeners();
  }

  async patch(values: Partial<Schema>): Promise<void> {
    for (const [key, value] of Object.entries(values)) {
      await this.setValue(
        key as keyof Schema,
        value as Schema[keyof Schema],
      );
    }
  }

  async reset(): Promise<void> {
    for (const key of Object.keys(this.state)) {
      await this.removeValue(key as keyof Schema);
    }

    this.state = { ...this.initialState };
  }

  getSetCookieHeaders(): Headers {
    return this.cookies;
  }
}
