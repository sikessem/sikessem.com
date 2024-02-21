import website from './website/server/entry.deno.js';
import { FileSystem } from '$abi/deno/FileSystem.ts';
import { FileRouter } from '$abi/deno/FileRouter.ts';
import type { Handler } from '$abi/contracts/RouterContract.ts';

Deno.serve(async (request: Request): Promise<Response> => {
  const fs_router = new FileRouter(new FileSystem(`${Deno.cwd()}/assets`));
  const handlers: Handler[] = [
    website as Handler,
    fs_router.handle.bind(fs_router),
  ];

  for (const handler of handlers) {
    const response = await handler(request);

    if (response.ok) {
      return response;
    }
  }

  return new Response('Error 404', {
    status: 404,
  });
});
