import type { FileSystemContract } from "./FileSystemContract";
import type { RouterContract } from "./RouterContract";

export interface FileRouterContract extends RouterContract {
  get fs(): FileSystemContract;
  set fs(fs: FileSystemContract);
}
