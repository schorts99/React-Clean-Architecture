import { Container } from 'inversify';
import { IndexedDBInitializer } from "@schorts/indexed-db-dao";
import {
  type QueryBus,
  type Cache as SharedCache,
  type Logger,
  ConsoleLogger,
  InMemoryQueryBus,
} from "@schorts/shared-kernel";
import { BrowserCache } from "@schorts/browser-cache";

import { TYPES } from "./types";

import { FakeAuthProvider } from "../modules/common/auth/infrastructure/providers";
import { AppBrowserStateManager } from "../modules/common/state/infrastructure/state/app-browser.state-manager";
import type { EntityDao } from "../modules/demo/entities/application/interfaces";
import { EntityIndexedDbDao } from "../modules/demo/entities/infrastructure/database/dao";
import type { UseCaseDao } from "../modules/demo/use-cases/application/interfaces";
import { UseCaseIndexedDbDao } from "../modules/demo/use-cases/infrastructure/database/dao";
import type { InfrastructureDao } from "../modules/demo/infrastructures/application/interfaces";
import { InfrastructureIndexedDbDao } from "../modules/demo/infrastructures/infrastructure/database/dao";

import { GetOverviewQueryHandler } from "../modules/demo/overview/application/query-handlers";

import { type AppStateManager } from "../modules/common/state/application/interfaces";
import { type AuthProvider } from '../modules/common/auth/application/interfaces';

import { type JWTDecoder } from "../modules/shared/jwt/jwt.decoder";
import { type JWTEncoder } from "../modules/shared/jwt/jwt.encoder";
import { JWTBrowserDecoder } from "../modules/shared/jwt/jwt-browser.decoder";
import { JWTBrowserEncoder } from "../modules/shared/jwt/jwt-browser.encoder";

export function createBrowserContainer(): Container {
  const container = new Container();

  container.bind<Logger>(TYPES.LOGGER).toConstantValue(
    new ConsoleLogger("debug"),
  );
  container.bind<JWTDecoder>(TYPES.JWT_DECODER).to(JWTBrowserDecoder).inSingletonScope();
  container.bind<JWTEncoder>(TYPES.JWT_ENCODER).to(JWTBrowserEncoder).inSingletonScope();
  container
    .bind<AppStateManager<false>>(TYPES.APP_STATE_MANAGER)
    .to(AppBrowserStateManager)
    .inSingletonScope();
  container.bind<AuthProvider>(TYPES.AUTH_PROVIDER).to(FakeAuthProvider).inSingletonScope();
  
  if (typeof window !== "undefined" && "indexedDB" in window) {
    container.bind<Promise<IDBDatabase>>(TYPES.INDEXED_DB).toConstantValue(
      new IndexedDBInitializer(
        import.meta.env.VITE_DB_NAME,
        1,
        [
          { name: "entities" },
          { name: "infrastructures" },
          { name: "use_cases" },
        ],
      ).initialize(),
    );
    container.bind<EntityDao>(TYPES.ENTITY_DAO).toConstantValue(
      new EntityIndexedDbDao(
        container.getAsync<IDBDatabase>(TYPES.INDEXED_DB),
      ),
    );
    container.bind<UseCaseDao>(TYPES.USE_CASE_DAO).toConstantValue(
      new UseCaseIndexedDbDao(
        container.getAsync<IDBDatabase>(TYPES.INDEXED_DB),
      ),
    );
    container
      .bind<InfrastructureDao>(TYPES.INFRASTRUCTURE_DAO)
      .toConstantValue(
        new InfrastructureIndexedDbDao(
          container.getAsync<IDBDatabase>(TYPES.INDEXED_DB),
        ),
      );
  }

  if (typeof window !== "undefined" && "caches" in window) {
    container.bind<SharedCache>(TYPES.CACHE).toConstantValue(
      new BrowserCache(
        import.meta.env.VITE_CACHE_NAME,
      ),
    );
  }

  container
    .bind<GetOverviewQueryHandler>(TYPES.GET_OVERVIEW_QUERY_HANDLER)
    .to(GetOverviewQueryHandler)
    .inSingletonScope();
  container.bind<QueryBus>(TYPES.QUERY_BUS).to(InMemoryQueryBus).inSingletonScope();

  return container;
}
