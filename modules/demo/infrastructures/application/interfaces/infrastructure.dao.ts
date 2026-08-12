import { type DAO } from "@schorts/shared-kernel";

import type { InfrastructurePrimitives } from "../../domain/types";
import { InfrastructureEntity } from "../../domain/entities";

export interface InfrastructureDao extends DAO<InfrastructurePrimitives, InfrastructureEntity> {}
