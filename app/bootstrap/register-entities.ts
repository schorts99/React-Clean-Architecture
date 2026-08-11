import { EntityRegistry } from "@schorts/indexed-db-dao";

import { EntityEntity } from "../../modules/demo/entities/domain/entities";

export function registerEntities(): void {
  EntityRegistry.register("entities", EntityEntity);
}
