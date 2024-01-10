import fs from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { refreshPaths } from 'laravel-vite-plugin';
import { ServerOptions } from 'vite';

export const laravelViteConfig = {
  input: ['resources/designs/app.tsx'],
  refresh: [...refreshPaths, 'templates/**', 'app/View/**'],
};

export function detectServerConfig(opts: {
  host: string | undefined;
  port: number | undefined;
  base: string | undefined;
}): ServerOptions {
  const keyPath = resolve(
    homedir(),
    `.config/valet/Certificates/${opts.host}.key`,
  );
  const certificatePath = resolve(
    homedir(),
    `.config/valet/Certificates/${opts.host}.crt`,
  );

  if (!fs.existsSync(keyPath) || !fs.existsSync(certificatePath)) {
    return opts;
  }

  return {
    hmr: {
      host: opts.host,
      port: opts.port,
    },
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certificatePath),
    },
    ...opts,
  };
}

export default laravelViteConfig;
