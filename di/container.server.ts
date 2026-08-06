import { Container } from 'inversify';

import { TYPES } from "./types";

import { type AuthProvider, FakeAuthProvider } from "../modules/common/auth/providers";
import { type AppStateManager } from "../modules/common/state/app.state-manager";
import { AppServerStateManager } from "../modules/common/state/app-server.state-manager";
import { type JWTDecoder } from "../modules/shared/jwt/jwt.decoder";
import { type JWTEncoder } from "../modules/shared/jwt/jwt.encoder";
import { JWTServerDecoder } from "../modules/shared/jwt/jwt-server.decoder";
import { JWTServerEncoder } from "../modules/shared/jwt/jwt-server.encoder";

export function createServerContainer(request: Request): Container {
  const container = new Container();

  container.bind<Request>(TYPES.REQUEST).toConstantValue(request);
  container.bind<JWTDecoder>(TYPES.JWT_DECODER).to(JWTServerDecoder);
  container.bind<JWTEncoder>(TYPES.JWT_ENCODER).to(JWTServerEncoder);
  container.bind<AppStateManager<true>>(TYPES.APP_STATE_MANAGER).to(AppServerStateManager);
  container.bind<AuthProvider>(TYPES.AUTH_PROVIDER).to(FakeAuthProvider);

  return container;
}
