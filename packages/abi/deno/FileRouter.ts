import { FileRouter as BaseFileRouter } from '../FileRouter.ts';
import { get_extension_type } from '../mime.ts';

export class FileRouter extends BaseFileRouter {
  handle(request: Request): Response {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);

    if (this.fs.exists(pathname)) {
      const path = this.fs.fullpath(pathname);
      if (path.isFile) {
        console.log(`Serve static file ${path.realname}`);
        return new Response(Deno.readFileSync(path.realname), {
          headers: {
            'Content-Type': get_extension_type(path.extension),
          },
        });
      }
    }

    return new Response(`File ${pathname} not found`, {
      status: 404,
    });
  }
}
