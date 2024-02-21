import website from './website/server/entry.deno.js';
import { FileSystem } from '$abi/deno/FileSystem.ts';
import { FileRouter } from '$abi/deno/FileRouter.ts';

Deno.serve(async (request: Request): Promise<Response> => {
  let response = await (website(request) as Promise<Response>);

  if (response.ok) {
    return response;
  }

  const assets = new FileSystem(`${Deno.cwd()}/assets`);
  response = new FileRouter(assets).handle(request);

  if (response.ok) {
    return response;
  }

  return new Response('Error 404', {
    status: 404,
  });
});
