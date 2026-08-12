import { EntityRegistry } from "@schorts/indexed-db-dao";

import { EntityEntity } from "../../modules/demo/entities/domain/entities";
import { UseCaseEntity } from "../../modules/demo/use-cases/domain/entities";

export function registerEntities(): void {
  EntityRegistry.register("entities", EntityEntity);
  EntityRegistry.register("use_cases", UseCaseEntity);
}
