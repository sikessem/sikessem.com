import { Server } from "./Server";

const port = 8080;
const hostname = "0.0.0.0";

const server = new Server({
  hostname,
  port,
}).start();

Bun.serve({
  port,
  hostname,
  async fetch(req) {
    const url = new URL(req.url);
    console.log(`Fetch ${url.pathname}`);
    if (url.pathname === "/") {
      return new Response("Home page!");
    }
    if (url.pathname === "/blog") {
      return new Response("Blog!");
    }
    const router = new Bun.FileSystemRouter({
      style: "nextjs",
      dir: `${__dirname}/routes`,
      // origin: hostname,
      // assetPrefix: "static/",
      fileExtensions: ["ts", "tsx"],
    });
    const matched = router.match(url.pathname);
    console.log(matched);
    console.log(router.routes);
    console.log(`${__dirname}/routes`);
    if (matched) {
      const route = await import(matched.filePath);
      return new Response(route);
    }
    return new Response("404!");
  },
});

console.log(
  `Serve on http://${server.hostname}:${server.port} in ${
    server.development ? "development" : "production"
  } mode`,
);
