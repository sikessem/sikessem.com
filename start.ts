import path from 'node:path';
import serveFontend from './website/server/entry.deno.js';
import { get_extension_type } from './mime.ts';

Deno.serve(async (request: Request): Promise<Response> => {
  const response = await (serveFontend(request) as Promise<Response>);
  if (response.ok) {
    return response;
  }

  const url = new URL(request.url);
  const pathname = decodeURIComponent(url.pathname);

  try {
    const asset = Deno.realPathSync(`${Deno.cwd()}/assets/${pathname}`);
    if (Deno.statSync(asset).isFile) {
      const file = Deno.readFileSync(asset);
      const ext = path.extname(asset);
      console.log(`Serve asset ${asset}`);
      return new Response(file, {
        headers: {
          'Content-Type': get_extension_type(ext),
        },
      });
    }
  } catch (error) {
    if (
      error! instanceof Deno.errors.NotFound &&
      error! instanceof Deno.errors.IsADirectory
    ) {
      throw error;
    }
  }

  return new Response('Error 404', {
    status: 404,
  });
});
