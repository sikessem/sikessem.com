import fs from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { qwikVite } from '@builder.io/qwik/optimizer';
import laravelVite, { refreshPaths } from 'laravel-vite-plugin';
import { type ConfigEnv, type ServerOptions, defineConfig, loadEnv }  from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  const host = env.VITE_CONFIG_SERVER_HOST ?? 'localhost';
  const base = env.VITE_CONFIG_SERVER_BASE ?? '/';
  const port = Number(env.VITE_CONFIG_SERVER_PORT ?? 4000);
  const root = env.VITE_CONFIG_SERVER_ROOT;
  const buildDirectory = env.VITE_CONFIG_BUILD_DIRECTORY ?? 'static';

  return {
    base,
    root,
    plugins: [
      laravelVite({
        input: ['resources/designs/app.css', 'resources/designs/app.tsx'],
        refresh: [...refreshPaths, 'resources/designs/**', 'resources/views/**', 'app/View/**'],
        buildDirectory,
      }),
      qwikVite({
        csr: true,
        srcDir: 'resources/designs',
      }),
      tsconfigPaths(),
    ],
    server: {
      ...detectServerConfig({
        host,
        port,
        base,
      }),
      headers: {
        'Cache-Control': 'public, max-age=0',
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    build: {
      manifest: 'manifest.json',
    },
    resolve: {
      alias: {
        '@': '/resources/assets',
      },
    },
  };
});

function detectServerConfig(opts: {
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
