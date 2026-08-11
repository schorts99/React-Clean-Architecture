import { type DAO } from "@schorts/shared-kernel";

import type { InfrastructureSchema } from "../schemas";

import { InfrastructureEntity } from "../../../domain/entities";

export interface InfrastructureDao extends DAO<InfrastructureSchema, InfrastructureEntity> {}
