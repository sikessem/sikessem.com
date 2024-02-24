import type { FileRouterContract } from "./contracts/FileRouterContract";
import type { FileSystemContract } from "./contracts/FileSystemContract";

export abstract class FileRouter implements FileRouterContract {
  public constructor(public fs: FileSystemContract) {}
  abstract handle(request: Request): Response;
}
