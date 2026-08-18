import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { CookieBrowserStateManager } from "./cookies-browser.state-manager";

type TestSchema = {
  token?: string;
  user?: { id: string; name: string };
  theme?: "light" | "dark";
  count?: number;
};

describe("CookieBrowserStateManager", () => {
  let manager: CookieBrowserStateManager<TestSchema>;
  let cookieStore: Record<string, string> = {};

  beforeEach(() => {
    cookieStore = {};

    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: () =>
        Object.entries(cookieStore)
          .map(([k, v]) => `${k}=${v}`)
          .join("; "),
      set: (value: string) => {
        const [pair] = value.split(";");
        const [key, ...rest] = pair.split("=");
        const rawValue = rest.join("=");

        if (value.includes("Max-Age=0")) {
          delete cookieStore[key.trim()];
        } else {
          cookieStore[key.trim()] = rawValue;
        }
      },
    });

    manager = new CookieBrowserStateManager<TestSchema>();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with empty state when no initialState is provided", () => {
    expect(manager.getState()).toEqual({});
  });

  it("initializes with the provided initialState", () => {
    const initial = { theme: "dark" as const, count: 0 };
    const m = new CookieBrowserStateManager(initial);

    expect(m.getState()).toEqual(initial);
  });

  it("setValue writes a cookie and updates internal state", () => {
    manager.setValue("token", "abc-123");

    expect(manager.getState().token).toBe("abc-123");
    expect(document.cookie).toContain("token=");
    expect(document.cookie).toContain(encodeURIComponent(JSON.stringify("abc-123")));
  });

  it("setValue correctly serializes objects", () => {
    const user = { id: "u1", name: "Alice" };
    manager.setValue("user", user);

    expect(manager.getState().user).toEqual(user);
    expect(document.cookie).toContain("user=");
  });

  it("setValue notifies subscribers", () => {
    const listener = vi.fn();

    manager.subscribe(listener);
    manager.setValue("theme", "dark");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ theme: "dark" })
    );
  });

  it("getValue returns undefined for a missing key", () => {
    expect(manager.getValue("token")).toBeUndefined();
  });

  it("getValue reads from cookie and updates internal state", () => {
    document.cookie = `token=${encodeURIComponent(JSON.stringify("xyz-789"))}; Path=/; SameSite=Lax`;
    const value = manager.getValue("token");

    expect(value).toBe("xyz-789");
    expect(manager.getState().token).toBe("xyz-789");
  });

  it("getValue correctly deserializes objects", () => {
    const user = { id: "u2", name: "Bob" };
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; Path=/`;

    expect(manager.getValue("user")).toEqual(user);
  });

  it("removeValue clears the cookie and deletes the key from state", () => {
    manager.setValue("token", "abc-123");

    expect(manager.getState().token).toBe("abc-123");

    manager.removeValue("token");

    expect(manager.getState().token).toBeUndefined();
    expect(document.cookie).not.toContain("token=");
  });

  it("removeValue notifies subscribers", () => {
    manager.setValue("theme", "light");

    const listener = vi.fn();

    manager.subscribe(listener);
    manager.removeValue("theme");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).not.toHaveProperty("theme");
  });

  it("patch sets multiple values at once", () => {
    manager.patch({
      token: "t-1",
      theme: "dark",
      count: 42,
    });

    const state = manager.getState();

    expect(state.token).toBe("t-1");
    expect(state.theme).toBe("dark");
    expect(state.count).toBe(42);
  });

  it("patch notifies listeners (once per setValue call)", () => {
    const listener = vi.fn();

    manager.subscribe(listener);
    manager.patch({ token: "a", theme: "light" });

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("reset removes all cookies and restores initialState", () => {
    const initial = { theme: "light" as const };
    const m = new CookieBrowserStateManager(initial);

    // @ts-ignore
    m.setValue("token", "abc");
    // @ts-ignore
    m.setValue("count", 99);
    m.reset();

    expect(m.getState()).toEqual(initial);
    expect(document.cookie).not.toContain("token=");
    expect(document.cookie).not.toContain("count=");
  });

  it("subscribe receives the full state on every change", () => {
    const listener = vi.fn();
    const unsubscribe = manager.subscribe(listener);

    manager.setValue("theme", "dark");
    manager.setValue("count", 1);

    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    manager.setValue("count", 2);

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("subscribeToKey only fires when the specific key changes", () => {
    const themeListener = vi.fn();
    const countListener = vi.fn();

    manager.subscribeToKey("theme", themeListener);
    manager.subscribeToKey("count", countListener);
    manager.setValue("theme", "dark");
    manager.setValue("count", 10);
    manager.setValue("theme", "light");

    expect(themeListener).toHaveBeenCalledTimes(2);
    expect(themeListener).toHaveBeenNthCalledWith(1, "dark");
    expect(themeListener).toHaveBeenNthCalledWith(2, "light");
    expect(countListener).toHaveBeenCalledTimes(1);
    expect(countListener).toHaveBeenCalledWith(10);
  });

  it("subscribeToKey does not fire when the value stays the same", () => {
    const listener = vi.fn();

    manager.subscribeToKey("theme", listener);
    manager.setValue("theme", "dark");
    manager.setValue("theme", "dark");

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
