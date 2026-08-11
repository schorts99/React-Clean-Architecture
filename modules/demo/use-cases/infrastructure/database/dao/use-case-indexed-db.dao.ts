import { IndexedDBDAO } from "@schorts/indexed-db-dao";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../../../di/types";

import type { UseCaseSchema } from "../schemas";

import type { UseCaseDao } from "../interfaces";
import { UseCaseEntity } from "../../../domain/entities";

@injectable()
export class UseCaseIndexedDbDao
extends IndexedDBDAO<UseCaseSchema, UseCaseEntity>
implements UseCaseDao {

  constructor(@inject(TYPES.INDEXED_DB) db: Promise<IDBDatabase>) {
    super(db, "use_cases");
  }
}
