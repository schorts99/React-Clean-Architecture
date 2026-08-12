import { type DAO } from "@schorts/shared-kernel";

import type { EntityPrimitives } from "../../domain/types";
import { EntityEntity } from "../../domain/entities";

export interface EntityDao extends DAO<EntityPrimitives, EntityEntity> {}
