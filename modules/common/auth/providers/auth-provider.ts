import { type AuthProvider as BaseAuthProvider } from "@schorts/shared-kernel";

import { UserEntity } from "../../users/entities";

export interface AuthProvider extends BaseAuthProvider<UserEntity> {}
