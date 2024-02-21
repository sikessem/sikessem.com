import type { PathContract } from './PathContract.ts';

export interface FileSystemContract {
  get root(): string;

  set root(root: string);

  exists(pathname: string): boolean;

  fullpath(pathname: string): PathContract;
}
