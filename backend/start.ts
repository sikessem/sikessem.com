import { existsSync } from 'https://deno.land/std/fs/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';
import { FileSystem } from '$abi/FileSystem.ts';
import { FileRouter } from '$abi/FileRouter.ts';
import type { Handler } from '$abi/core/contracts/RouterContract.ts';

Deno.serve(async (request: Request): Promise<Response> => {
  const handlers: Handler[] = [];

  const frontend_server_path = join(
    Deno.cwd(),
    '../frontend/out/server/entry.deno.js',
  );
  if (existsSync(frontend_server_path)) {
    const frontend_server_module = await import(frontend_server_path);
    const frontend_server = frontend_server_module.default as Handler;
    handlers.push(frontend_server);
  }

  const assets_path = join(Deno.cwd(), 'assets');
  if (existsSync(assets_path)) {
    const assets_fs = new FileSystem(assets_path);
    const assets_router = new FileRouter(assets_fs);
    const assets_server = assets_router.handle.bind(assets_router);
    handlers.push(assets_server);
  }

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
