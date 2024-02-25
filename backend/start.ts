import { existsSync } from 'https://deno.land/std/fs/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';
import { FileSystem } from '$abi/fs.ts';
import { ActionRouter, FileRouter } from '$abi/routing.ts';
import type { Handler } from '$abi/base/routing.ts';

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

  const actions_router = new ActionRouter();
  actions_router.onGet('/home', () => 'Welcome to my homepage');
  const actions_server = actions_router.handle.bind(actions_router);
  handlers.push(actions_server);

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
