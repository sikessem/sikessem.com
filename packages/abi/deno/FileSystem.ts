import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { FileSystem as BaseFileSystem } from "./core/FileSystem.ts";
import type { PathContract } from "./core/contracts/PathContract.ts";
import { Path } from "./Path.ts";

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
