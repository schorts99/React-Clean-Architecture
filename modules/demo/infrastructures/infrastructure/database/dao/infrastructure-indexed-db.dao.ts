import { IndexedDBDAO } from "@schorts/indexed-db-dao";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../../../di/types";

import type { InfrastructureSchema } from "../schemas";

import type { InfrastructureDao } from "../interfaces";
import { InfrastructureEntity } from "../../../domain/entities";

@injectable()
export class InfrastructureIndexedDbDao
extends IndexedDBDAO<InfrastructureSchema, InfrastructureEntity>
implements InfrastructureDao {
  constructor(@inject(TYPES.INDEXED_DB) db: Promise<IDBDatabase>) {
    super(db, "Infrastructures");
  }
}
