import type { FileSystemContract } from "./file-system";

export type Handler = (request: Request) => Response | Promise<Response>;

export abstract class Router implements RouterContract {
  abstract handle: Handler;
}

export interface FileRouterContract extends RouterContract {
  get fs(): FileSystemContract;
  set fs(fs: FileSystemContract);
}

export interface RouterContract {
  handle: Handler;
}

export abstract class BaseFileRouter implements FileRouterContract {
  public constructor(public fs: FileSystemContract) {}
  abstract handle(request: Request): Response;
}
