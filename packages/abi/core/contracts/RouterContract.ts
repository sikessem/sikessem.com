export type Handler = (request: Request) => Response | Promise<Response>;

export interface RouterContract {
  handle: Handler;
}
