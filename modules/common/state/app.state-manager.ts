import { type StateManager } from "@schorts/shared-kernel";

export interface AppStateManager<IsAsync extends boolean> extends StateManager<{ auth_token: string | null }, IsAsync> {}
