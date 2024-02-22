import type { FileSystemContract } from "./contracts/FileSystemContract";
import type { PathContract } from "./contracts/PathContract";

export abstract class FileSystem implements FileSystemContract {
  constructor(public root: string) {}

  abstract exists(pathname: string): boolean;

  abstract fullpath(pathname: string): PathContract;
}
