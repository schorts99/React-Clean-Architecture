import { IndexedDBDAO } from "@schorts/indexed-db-dao";
import { injectable } from "inversify";

import type { EntitySchema } from "../schemas";

import type { EntityDao } from "../interfaces";
import { EntityEntity } from "../../../domain/entities";

@injectable()
export class EntityIndexedDbDao
extends IndexedDBDAO<EntitySchema, EntityEntity>
implements EntityDao {
  constructor(db: Promise<IDBDatabase>) {
    super(db, "entities");
  }
}
