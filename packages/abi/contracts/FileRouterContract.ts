import type { FileSystemContract } from './FileSystemContract.ts';
import type { RouterContract } from './RouterContract.ts';

export interface FileRouterContract extends RouterContract {
  get fs(): FileSystemContract;
  set fs(fs: FileSystemContract);
}
