import { injectable } from "inversify";

import type { AppStateManager } from "../../application/interfaces";

import { CookieBrowserStateManager } from "../../../../shared/cookies/cookies-browser.state-manager";

@injectable()
export class AppBrowserStateManager
  extends CookieBrowserStateManager<AppStateManager<false>["state"]>
  implements AppStateManager<false> {
}
