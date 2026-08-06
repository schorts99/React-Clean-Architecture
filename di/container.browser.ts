import { Container } from 'inversify';

import { TYPES } from "./types";

import { type AuthProvider, FakeAuthProvider } from "../modules/common/auth/providers";
import { type AppStateManager } from "../modules/common/state/app.state-manager";
import { AppBrowserStateManager } from "../modules/common/state/app-browser.state-manager";
import { type JWTDecoder } from "../modules/shared/jwt/jwt.decoder";
import { type JWTEncoder } from "../modules/shared/jwt/jwt.encoder";
import { JWTBrowserDecoder } from "../modules/shared/jwt/jwt-browser.decoder";
import { JWTBrowserEncoder } from "../modules/shared/jwt/jwt-browser.encoder";

export function createBrowserContainer(): Container {
  const container = new Container();

  container.bind<JWTDecoder>(TYPES.JWT_DECODER).to(JWTBrowserDecoder);
  container.bind<JWTEncoder>(TYPES.JWT_ENCODER).to(JWTBrowserEncoder);
  container.bind<AppStateManager<false>>(TYPES.APP_STATE_MANAGER).to(AppBrowserStateManager);
  container.bind<AuthProvider>(TYPES.AUTH_PROVIDER).to(FakeAuthProvider);

  return container;
}
