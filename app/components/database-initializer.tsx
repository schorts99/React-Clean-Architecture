import { useContext, useEffect } from "react";

import { DependencyInjectionContext } from "~/contexts";

import { MainDatabaseSeeder } from "../../modules/demo/database/infrastructure/database/seeders";
import { EntitiesSeeder } from "../../modules/demo/entities/infrastructure/database/seeders";
import { UseCasesSeeder } from "../../modules/demo/use-cases/infrastructure/database/seeders";
import type { EntityDao } from "../../modules/demo/entities/infrastructure/database/interfaces";
import type { UseCaseDao } from "../../modules/demo/use-cases/infrastructure/database/interfaces";

export function DatabaseInitializer() {
  const { container, TYPES } = useContext(DependencyInjectionContext);

  useEffect(() => {
    const entityDao = container.get<EntityDao>(TYPES.ENTITY_DAO);
    const useCaseDao = container.get<UseCaseDao>(TYPES.USE_CASE_DAO);
    const entitiesSeeder = new EntitiesSeeder(entityDao);
    const useCasesSeeder = new UseCasesSeeder(useCaseDao);
    const mainDatabaseSeeder = new MainDatabaseSeeder([
      entitiesSeeder,
      useCasesSeeder,
    ]);

    mainDatabaseSeeder
      .seedAll()
      .then((res) => {
        if (res) {
          window.location.reload();
        }
      });
  }, []);

  return null;
}
