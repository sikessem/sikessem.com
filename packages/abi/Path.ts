import type { PathContract, PathInfo } from './contracts/PathContract.ts';

export abstract class Path implements PathContract {
  constructor(public name: string) {}
  abstract get info(): PathInfo;
  abstract get realname(): string;
  abstract get isAbsolute(): boolean;
  abstract get isFile(): boolean;
  abstract get isDirectory(): boolean;
  abstract get isSymlink(): boolean;
  abstract get size(): number;
  abstract get mtime(): Date | null;
  abstract get atime(): Date | null;
  abstract get birthtime(): Date | null;
  abstract get extension(): string;
  abstract get basename(): string;
  abstract get dirname(): string;
  abstract normalize(): string;
  toString(): string {
    return this.name;
  }
}
