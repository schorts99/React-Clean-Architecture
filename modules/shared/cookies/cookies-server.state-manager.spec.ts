import { describe, it, expect, beforeEach, vi } from "vitest";

import { CookieServerStateManager } from "./cookies-server.state-manager";

type TestSchema = {
  token?: string;
  user?: { id: string; name: string };
  theme?: "light" | "dark";
  count?: number;
};

function createRequest(cookieHeader?: string): Request {
  const headers = new Headers();

  if (cookieHeader) {
    headers.set("cookie", cookieHeader);
  }

  return new Request("http://localhost", { headers });
}

describe("CookieServerStateManager", () => {
  let manager: CookieServerStateManager<TestSchema>;

  beforeEach(() => {
    manager = new CookieServerStateManager<TestSchema>(createRequest());
  });

  it("starts with empty state when no initialState is provided", () => {
    expect(manager.getState()).toEqual({});
  });

  it("initializes with the provided initialState", () => {
    const initial = { theme: "dark" as const, count: 0 };
    const m = new CookieServerStateManager(createRequest(), initial);

    expect(m.getState()).toEqual(initial);
  });

  it("getValue returns undefined when the cookie does not exist", async () => {
    const value = await manager.getValue("token");

    expect(value).toBeUndefined();
  });

  it("getValue reads a simple value from the request cookie header", async () => {
    const request = createRequest(
      `token=${encodeURIComponent(JSON.stringify("abc-123"))}`
    );
    const m = new CookieServerStateManager<TestSchema>(request);
    const value = await m.getValue("token");

    expect(value).toBe("abc-123");
    expect(m.getState().token).toBe("abc-123");
  });

  it("getValue correctly deserializes objects", async () => {
    const user = { id: "u1", name: "Alice" };
    const request = createRequest(
      `user=${encodeURIComponent(JSON.stringify(user))}`
    );
    const m = new CookieServerStateManager<TestSchema>(request);
    const value = await m.getValue("user");

    expect(value).toEqual(user);
    expect(m.getState().user).toEqual(user);
  });

  it("setValue updates internal state and appends a Set-Cookie header", async () => {
    await manager.setValue("token", "xyz-789");

    expect(manager.getState().token).toBe("xyz-789");

    const headers = manager.getSetCookieHeaders();
    const setCookie = headers.get("Set-Cookie");

    expect(setCookie).toBeTruthy();
    expect(setCookie).toContain("token=");
    expect(setCookie).toContain(encodeURIComponent(JSON.stringify("xyz-789")));
    expect(setCookie).toContain("Path=/");
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("SameSite=Lax");
  });

  it("setValue correctly serializes objects", async () => {
    const user = { id: "u2", name: "Bob" };

    await manager.setValue("user", user);

    expect(manager.getState().user).toEqual(user);

    const setCookie = manager.getSetCookieHeaders().get("Set-Cookie");

    expect(setCookie).toContain("user=");
    expect(setCookie).toContain(encodeURIComponent(JSON.stringify(user)));
  });

  it("setValue notifies subscribers", async () => {
    const listener = vi.fn();

    manager.subscribe(listener);
    await manager.setValue("theme", "dark");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ theme: "dark" })
    );
  });

  it("removeValue deletes the key from state and appends a deletion Set-Cookie", async () => {
    await manager.setValue("token", "abc-123");

    expect(manager.getState().token).toBe("abc-123");

    await manager.removeValue("token");

    expect(manager.getState().token).toBeUndefined();

    const headers = manager.getSetCookieHeaders();
    const allSetCookies = headers.getSetCookie?.() ?? [headers.get("Set-Cookie")];
    const deletionCookie = allSetCookies.find((c) =>
      c?.includes("token=") && c.includes("Max-Age=0")
    );

    expect(deletionCookie).toBeTruthy();
    expect(deletionCookie).toContain("Path=/");
    expect(deletionCookie).toContain("HttpOnly");
  });

  it("removeValue notifies subscribers", async () => {
    await manager.setValue("theme", "light");

    const listener = vi.fn();

    manager.subscribe(listener);

    await manager.removeValue("theme");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).not.toHaveProperty("theme");
  });

  it("patch sets multiple values", async () => {
    await manager.patch({
      token: "t-1",
      theme: "dark",
      count: 42,
    });

    const state = manager.getState();

    expect(state.token).toBe("t-1");
    expect(state.theme).toBe("dark");
    expect(state.count).toBe(42);
  });

  it("patch notifies listeners once per setValue", async () => {
    const listener = vi.fn();

    manager.subscribe(listener);
    await manager.patch({ token: "a", theme: "light" });

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("reset removes all keys and restores initialState", async () => {
    const initial = { theme: "light" as const };
    const m = new CookieServerStateManager(createRequest(), initial);

    // @ts-ignore
    await m.setValue("token", "abc");
    // @ts-ignore
    await m.setValue("count", 99);
    await m.reset();

    expect(m.getState()).toEqual(initial);
  });

  it("getSetCookieHeaders returns the accumulated headers", async () => {
    await manager.setValue("token", "one");
    await manager.setValue("theme", "dark");

    const headers = manager.getSetCookieHeaders();
    const cookies = headers.getSetCookie?.() ?? [];

    expect(cookies.length).toBeGreaterThanOrEqual(2);
    expect(cookies.some((c) => c.startsWith("token="))).toBe(true);
    expect(cookies.some((c) => c.startsWith("theme="))).toBe(true);
  });

  it("subscribe receives the full state on every change", async () => {
    const listener = vi.fn();
    const unsubscribe = manager.subscribe(listener);

    await manager.setValue("theme", "dark");
    await manager.setValue("count", 1);

    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    await manager.setValue("count", 2);

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("subscribeToKey only fires when the specific key changes", async () => {
    const themeListener = vi.fn();
    const countListener = vi.fn();

    manager.subscribeToKey("theme", themeListener);
    manager.subscribeToKey("count", countListener);

    await manager.setValue("theme", "dark");
    await manager.setValue("count", 10);
    await manager.setValue("theme", "light");

    expect(themeListener).toHaveBeenCalledTimes(2);
    expect(themeListener).toHaveBeenNthCalledWith(1, "dark");
    expect(themeListener).toHaveBeenNthCalledWith(2, "light");

    expect(countListener).toHaveBeenCalledTimes(1);
    expect(countListener).toHaveBeenCalledWith(10);
  });
});
