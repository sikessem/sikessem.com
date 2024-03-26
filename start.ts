import { existsSync } from "node:fs";
import { join } from "node:path";
import { serve } from "phun";
import type { Handler } from "sikessem/base/routing";
import { FileSystem } from "sikessem/core/fs";
import { ActionRouter, FileRouter } from "sikessem/core/routing";

const server = Bun.serve({
  async fetch(request: Request, server): Promise<Response> {
    const handlers: Handler[] = [];
    const assets_path = join(import.meta.dir, "/website/public");

    if (existsSync(assets_path)) {
      const assets_fs = new FileSystem(assets_path);
      const assets_router = new FileRouter(assets_fs);
      const response = assets_router.handle(request);
      if (response.ok) {
        return response;
      }
    }

    return await serve(
      `${import.meta.dir}/website/public/index.php`,
      request,
      server,
    );
  },
});

console.log(`Listening on http://localhost:${server.port}`);
