import { use } from "phun";

const server = Bun.serve({
  async fetch(_req: Request): Promise<Response> {
    const content = await use(`${import.meta.dir}/website/public/index.php`);
    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
