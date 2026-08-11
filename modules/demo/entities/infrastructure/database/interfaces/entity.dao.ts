import { type DAO } from "@schorts/shared-kernel";

import type { EntitySchema } from "../schemas";

import { EntityEntity } from "../../../domain/entities";

export interface EntityDao extends DAO<EntitySchema, EntityEntity> {}
