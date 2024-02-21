import website from './website/server/entry.deno.js';
import { get_extension_type } from './mime.ts';
import { FileSystem } from '$abi/deno/FileSystem.ts';

Deno.serve(async (request: Request): Promise<Response> => {
  const response = await (website(request) as Promise<Response>);
  if (response.ok) {
    return response;
  }

  const url = new URL(request.url);
  const pathname = decodeURIComponent(url.pathname);
  const assets = new FileSystem(`${Deno.cwd()}/assets`);

  if (assets.exists(pathname)) {
    const asset = assets.fullpath(pathname);
    if (asset.isFile) {
      console.log(`Serve static asset ${asset.realname}`);
      return new Response(Deno.readFileSync(asset.realname), {
        headers: {
          'Content-Type': get_extension_type(asset.extension),
        },
      });
    }
  }

  return new Response('Error 404', {
    status: 404,
  });
});
