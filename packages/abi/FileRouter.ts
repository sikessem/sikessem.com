import type { FileRouterContract } from './contracts/FileRouterContract.ts';
import type { FileSystemContract } from '$abi/contracts/FileSystemContract.ts';

export abstract class FileRouter implements FileRouterContract {
  public constructor(public fs: FileSystemContract) {}
  abstract handle(request: Request): Response;
}
