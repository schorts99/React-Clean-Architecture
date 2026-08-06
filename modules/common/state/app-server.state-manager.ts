import { injectable, inject } from "inversify";

import { TYPES } from "../../../di/types";

import type { AppStateManager } from "./app.state-manager";

import { CookieServerStateManager } from "../../shared/cookies/cookies-server.state-manager";

@injectable()
export class AppServerStateManager
  extends CookieServerStateManager<AppStateManager<true>["state"]>
  implements AppStateManager<true> {
  constructor(@inject(TYPES.REQUEST) request: Request) {
    super(request);
  }
}
