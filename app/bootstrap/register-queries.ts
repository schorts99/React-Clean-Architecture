import { QueryRegistry } from "@schorts/shared-kernel";

import { GetOverviewQuery } from "../../modules/demo/overview/application/queries";
import { GetAllEntitiesQuery } from "../../modules/demo/entities/application/queries";
import { GetAllUseCasesQuery } from "../../modules/demo/use-cases/application/queries";
import {
  GetHealthQuery,
  GetAllInfrastructuresQuery,
} from "../../modules/demo/infrastructures/application/queries";

export function registerQueries(): void {
  QueryRegistry.register(
    GetOverviewQuery.type,
    GetOverviewQuery,
  );
  QueryRegistry.register(
    GetAllEntitiesQuery.type,
    GetAllEntitiesQuery,
  );
  QueryRegistry.register(
    GetAllUseCasesQuery.type,
    GetAllUseCasesQuery,
  );
  QueryRegistry.register(
    GetHealthQuery.type,
    GetHealthQuery,
  );
  QueryRegistry.register(
    GetAllInfrastructuresQuery.type,
    GetAllInfrastructuresQuery,
  );
}
