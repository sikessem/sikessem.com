import { FileSystem as BaseFileSystem } from '../FileSystem.ts';
import { Path } from './Path.ts';
import { existsSync } from 'https://deno.land/std@0.216.0/fs/mod.ts';
import type { PathContract } from '$abi/contracts/PathContract.ts';

export class FileSystem extends BaseFileSystem {
  exists(pathname: string): boolean {
    return existsSync(this.fullpath(pathname).toString());
  }

  fullpath(pathname: string): PathContract {
    if (!pathname.startsWith(this.root)) {
      pathname = `${this.root}/${pathname}`;
    }
    return new Path(pathname);
  }
}
