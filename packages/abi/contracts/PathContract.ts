import type { PathInfoContract } from './PathInfoContract.ts';

export interface PathContract {
  get name(): string;
  set name(name: string);
  get realname(): string;
  get info(): PathInfoContract;
  get isAbsolute(): boolean;
  get isFile(): boolean;
  get isDirectory(): boolean;
  get isSymlink(): boolean;
  get size(): number;
  get mtime(): Date | null;
  get atime(): Date | null;
  get birthtime(): Date | null;
  get extension(): string;
  get basename(): string;
  get dirname(): string;
  normalize(): string;
  toString(): string;
}
