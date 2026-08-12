import { QueryRegistry } from "@schorts/shared-kernel";

import { GetOverviewQuery } from "../../modules/demo/overview/application/queries";
import { GetAllEntitiesQuery } from "../../modules/demo/entities/application/queries";

export function registerQueries(): void {
  QueryRegistry.register(
    GetOverviewQuery.type,
    GetOverviewQuery,
  );
  QueryRegistry.register(
    GetAllEntitiesQuery.type,
    GetAllEntitiesQuery,
  );
}
