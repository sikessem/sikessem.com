import type { FileSystemContract } from './contracts/FileSystemContract.ts';
import type { PathContract } from '$abi/contracts/PathContract.ts';

export abstract class FileSystem implements FileSystemContract {
  constructor(public root: string) {}

  abstract exists(pathname: string): boolean;

  abstract fullpath(pathname: string): PathContract;
}
