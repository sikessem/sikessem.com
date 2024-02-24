import type { Handler } from "./contracts/RouterContract";
import type { RouterContract } from "./contracts/RouterContract";

export abstract class Router implements RouterContract {
  abstract handle: Handler;
}
