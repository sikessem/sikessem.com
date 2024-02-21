export type Handler = (request: Request) => Response;

export interface RouterContract {
  handle: Handler;
}
