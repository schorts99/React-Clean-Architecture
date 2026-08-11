import { type DAO } from "@schorts/shared-kernel";

import type { UseCaseSchema } from "../schemas";

import { UseCaseEntity } from "../../../domain/entities";

export interface UseCaseDao extends DAO<UseCaseSchema, UseCaseEntity> {}
