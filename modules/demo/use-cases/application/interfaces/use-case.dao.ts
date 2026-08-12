import { type DAO } from "@schorts/shared-kernel";

import type { UseCasePrimitives } from "../../domain/types";
import { UseCaseEntity } from "../../domain/entities";

export interface UseCaseDao extends DAO<UseCasePrimitives, UseCaseEntity> {}
