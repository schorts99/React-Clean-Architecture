import { IndexedDBDAO } from "@schorts/indexed-db-dao";
import { injectable } from "inversify";

import type { UseCaseSchema } from "../schemas";

import type { UseCaseDao } from "../../../application/interfaces";

import { UseCaseEntity } from "../../../domain/entities";

@injectable()
export class UseCaseIndexedDbDao
extends IndexedDBDAO<UseCaseSchema, UseCaseEntity>
implements UseCaseDao {

  constructor(db: Promise<IDBDatabase>) {
    super(db, "use_cases");
  }
}
