import { describe, expect, it } from "vitest";
import { IndexedDBDAO } from "@schorts/indexed-db-dao";

import { UseCaseIndexedDbDao } from "./use-case-indexed-db.dao";

describe("UseCaseIndexedDbDao", () => {
  it("should extend IndexedDBDAO", () => {
    const db = Promise.resolve({} as IDBDatabase);
    const dao = new UseCaseIndexedDbDao(db);

    expect(dao).toBeInstanceOf(IndexedDBDAO);
  });
});
