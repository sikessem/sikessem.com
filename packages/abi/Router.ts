import type { Handler } from './contracts/RouterContract.ts';
import type { RouterContract } from './contracts/RouterContract.ts';

export abstract class Router implements RouterContract {
  abstract handle: Handler;
}
