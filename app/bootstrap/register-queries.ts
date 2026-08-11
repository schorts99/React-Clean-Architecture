import { QueryRegistry } from "@schorts/shared-kernel";

import { GetOverviewQuery } from "../../modules/demo/overview/application/queries";

export function registerQueries(): void {
  QueryRegistry.register(
    GetOverviewQuery.type,
    GetOverviewQuery,
  );
}
