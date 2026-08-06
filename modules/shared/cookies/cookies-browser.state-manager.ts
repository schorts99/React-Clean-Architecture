import { StateManager } from "@schorts/shared-kernel";

export class CookieBrowserStateManager<
  Schema extends Record<string, any>,
> extends StateManager<Schema> {
  constructor(initialState: Schema = {} as Schema) {
    super(initialState);
  }

  getValue<Key extends keyof Schema>(key: Key): Schema[Key] {
    const value = this.getCookie(String(key));
    this.state[key] = value as Schema[Key];

    return this.state[key];
  }

  setValue<Key extends keyof Schema>(key: Key, value: Schema[Key]): void {
    document.cookie = `${String(key)}=${encodeURIComponent(JSON.stringify(value))}; Path=/; SameSite=Lax`;
    this.state[key] = value;

    this.notifyListeners();
  }

  removeValue<Key extends keyof Schema>(key: Key): void {
    document.cookie = `${String(key)}=; Max-Age=0; Path=/`;

    delete this.state[key];

    this.notifyListeners();
  }

  patch(values: Partial<Schema>): void {
    Object.entries(values).forEach(([key, value]) => {
      this.setValue(key as keyof Schema, value as Schema[keyof Schema]);
    });
  }

  reset(): void {
    Object.keys(this.state).forEach(key => {
      this.removeValue(key as keyof Schema);
    });

    this.state = { ...this.initialState };
  }

  private getCookie(name: string): unknown {
    const cookie = document.cookie
      .split("; ")
      .find(c => c.startsWith(`${name}=`));

    if (!cookie) {
      return undefined;
    }

    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  }
}
