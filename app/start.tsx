const port = 8080
const hostname = "0.0.0.0"

Bun.serve({
  port,
  hostname,
    fetch(req) {
      const router = new Bun.FileSystemRouter({
          style: "nextjs",
          dir: `${__dirname}/routes`,
          origin: hostname,
          assetPrefix: "static/"
        });
        router.match("/");
      const url = new URL(req.url);
      if (url.pathname === "/") { return new Response("Home page!"); }
      if (url.pathname === "/blog") { return new Response("Blog!"); }
      return new Response("404!");
    },
    error(error) {
      return new Response(`<pre>${error}\n${error.stack}</pre>`, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    },
  });
