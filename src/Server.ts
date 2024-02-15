import type { ErrorLike as ServerError, Server as ServerInstance } from "bun";

export type ServerOptions = { hostname: string; port: string | number };

export type ServerContext = {
  request: Request;
  response: Response;
  server: ServerInstance;
};

export type Handler = (context: ServerContext) => Response;

export type ErrorHandler = (error: ServerError) => Response;

export class Server {
  constructor(
    protected options: ServerOptions,
    protected fetchHandlers: Handler[] = [],
    protected errorHandlers: Handler[] = [],
  ) {}

  public onFetch(handler: Handler): this {
    this.fetchHandlers.push(handler);
    return this;
  }

  public onError(handler: Handler): this {
    this.errorHandlers.push(handler);
    return this;
  }

  public start(): ServerInstance {
    return Bun.serve({
      ...this.options,
      fetch(_req) {
        return new Response("Hello");
      },
      error(error) {
        return new Response(`<pre>${error}\n${error.stack}</pre>`, {
          headers: {
            "Content-Type": "text/html",
          },
        });
      },
    });
  }
}
