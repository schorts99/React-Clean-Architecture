import { useContext, useEffect } from "react";

import { DependencyInjectionContext } from "~/contexts";

import { MainDatabaseSeeder } from "../../modules/demo/database/infrastructure/database/seeders";
import { EntitiesSeeder } from "../../modules/demo/entities/infrastructure/database/seeders";
import type { EntityDao } from "../../modules/demo/entities/infrastructure/database/interfaces";

export function DatabaseInitializer() {
  const { container, TYPES } = useContext(DependencyInjectionContext);

  useEffect(() => {
    const entityDao = container.get<EntityDao>(TYPES.ENTITY_DAO);
    const entitiesSeeder = new EntitiesSeeder(entityDao);
    const mainDetabaseSeeder = new MainDatabaseSeeder([
      entitiesSeeder,
    ]);

    mainDetabaseSeeder
      .seedAll()
      .then((res) => {
        if (res) {
          window.location.reload();
        }
      });
  }, []);

  return null;
}
