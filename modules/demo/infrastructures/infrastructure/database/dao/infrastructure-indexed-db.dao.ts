import { IndexedDBDAO } from "@schorts/indexed-db-dao";
import { injectable } from "inversify";

import type { InfrastructureSchema } from "../schemas";

import type { InfrastructureDao } from "../interfaces";
import { InfrastructureEntity } from "../../../domain/entities";

@injectable()
export class InfrastructureIndexedDbDao
extends IndexedDBDAO<InfrastructureSchema, InfrastructureEntity>
implements InfrastructureDao {
  constructor(db: Promise<IDBDatabase>) {
    super(db, "infrastructures");
  }
}
