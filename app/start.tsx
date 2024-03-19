import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Handler } from "abi.js/base/routing";
import { FileSystem } from "abi.js/bun/fs";
import { ActionRouter, FileRouter } from "abi.js/bun/routing";

const port = 3000;

const server = Bun.serve({
  port,
  async fetch(request: Request): Promise<Response> {
    const handlers: Handler[] = [];

    const assets_path = join(process.cwd(), "assets");
    if (existsSync(assets_path)) {
      const assets_fs = new FileSystem(assets_path);
      const assets_router = new FileRouter(assets_fs);
      const assets_server = assets_router.handle.bind(assets_router);
      handlers.push(assets_server);
    }

    const actions_router = new ActionRouter();
    actions_router.onGet("/", () => "Welcome to my homepage");
    actions_router.onGet(
      "/users/[user:number=0]/profile",
      (request: Request, user = 5) => `${request.method} User ${user}`,
    );
    const actions_server = actions_router.handle.bind(actions_router);
    handlers.push(actions_server);

    for (const handler of handlers) {
      const response = await handler(request);

      if (response.ok) {
        return response;
      }
    }

    return new Response("Error 404", {
      status: 404,
    });
  },
});

console.log(`Server run on http://localhost:${server.port}`);
