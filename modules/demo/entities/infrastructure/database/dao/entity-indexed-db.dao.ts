import { IndexedDBDAO } from "@schorts/indexed-db-dao";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../../../di/types";

import type { EntitySchema } from "../schemas";

import type { EntityDao } from "../interfaces";
import { EntityEntity } from "../../../domain/entities";

@injectable()
export class EntityIndexedDbDao
extends IndexedDBDAO<EntitySchema, EntityEntity>
implements EntityDao {
  constructor(@inject(TYPES.INDEXED_DB) db: Promise<IDBDatabase>) {
    super(db, "entities");
  }
}
