import {
  type AuthChangeCallback,
  type AuthenticationResult,
  type AuthCredentials,
  type UserSession,
  type Permission,
  type BaseAction,
  type AuthChangeUnsubscribe,
  AuthenticationError,
  NotAuthenticated,
} from "@schorts/shared-kernel";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../../di/types";

import { UserEntity } from "../../users/entities";
import { type AppStateManager } from "../../state/app.state-manager";
import { type AuthProvider } from "./auth-provider";

import { type JWTDecoder } from "../../../shared/jwt/jwt.decoder";
import { type JWTEncoder } from "../../../shared/jwt/jwt.encoder";

@injectable()
export class FakeAuthProvider<IsAsync extends boolean> implements AuthProvider {
  private readonly subscribers: Set<AuthChangeCallback<UserEntity>>;

  constructor(
    @inject(TYPES.APP_STATE_MANAGER)
    private readonly appStateManager: AppStateManager<IsAsync>,
    @inject(TYPES.JWT_ENCODER)
    private readonly jwtEncoder: JWTEncoder,
    @inject(TYPES.JWT_DECODER)
    private readonly jwtDecoder: JWTDecoder,
  ) {
    this.subscribers = new Set();
  }

  async authenticate(credentials: AuthCredentials): Promise<AuthenticationResult> {
    if (!credentials.email?.toLowerCase().includes("test")) {
      throw new AuthenticationError("Credentials Not Valid");
    }

    const token = this.jwtEncoder.encode({
      sub: "2f01633c-65a2-494e-9ec1-3cb33a20f4f1",
      email: credentials.email,
    });

    await this.appStateManager.setValue("auth_token", token);

    return {
      token,
    };
  }

  async logout(): Promise<void> {
    await this.appStateManager.removeValue("auth_token");
    await this.notifyAuthChange(null);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.appStateManager.getValue("auth_token");

    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.jwtDecoder.decode(token);
      const currentTimeInSeconds = Date.now() / 1000;

      return decodedToken["exp"] >= currentTimeInSeconds;
    } catch {
      return false;
    }
  }

  async getCurrentUser(): Promise<UserEntity | null> {
    if (!(await this.isAuthenticated())) {
      return null;
    }

    return UserEntity.fromPrimitives({
      id: "2f01633c-65a2-494e-9ec1-3cb33a20f4f1",
      name: "John",
    });
  }

  async getCurrentUserPermissions(): Promise<Permission<BaseAction>[]> {
    return [];
  }

  async getCurrentUserRoles(): Promise<[]> {
    return [];
  }

  async getCurrentSession(): Promise<UserSession<UserEntity> | null> {
    if (!(await this.isAuthenticated())) {
      return null;
    }

    const token = await this.appStateManager.getValue("auth_token");
    const user = await this.getCurrentUser();

    if (!token || !user) {
      return null;
    }

    return {
      user,
      token,
      roles: await this.getCurrentUserRoles(),
      permissions: await this.getCurrentUserPermissions(),
    };
  }

  async refreshToken(refreshToken?: string): Promise<AuthenticationResult> {
    if (!refreshToken) {
      throw new NotAuthenticated();
    }

    let token: string = (await this.appStateManager.getValue("auth_token"))!;
    const decodedToken = this.jwtDecoder.decode(token);
    token = this.jwtEncoder.encode({
      sub: "2f01633c-65a2-494e-9ec1-3cb33a20f4f1",
      email: decodedToken.email,
    });

    await this.appStateManager.setValue("auth_token", token);

    return {
      token,
      refreshToken,
    };
  }

  async refreshCurrentUser(): Promise<UserEntity | null> {
    if (!(await this.isAuthenticated())) {
      await this.notifyAuthChange(null);

      return null;
    }

    const session = await this.getCurrentSession();

    await this.notifyAuthChange(session);

    return session!.user;
  }

  async revokeToken(token?: string): Promise<void> {
    if (!token) {
      throw new NotAuthenticated();
    }

    await this.logout();
  }

  onAuthChange(
    callback: AuthChangeCallback<UserEntity>
  ): AuthChangeUnsubscribe {
    this.subscribers.add(callback);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  private async notifyAuthChange(
    session: UserSession<UserEntity> | null
  ): Promise<void> {
    for (const subscriber of this.subscribers) {
      await subscriber(session);
    }
  }
}
