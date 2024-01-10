import { qwikRollup, qwikVite } from '@builder.io/qwik/optimizer';
import laravelVite from 'laravel-vite-plugin';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { detectServerConfig, laravelViteConfig } from './laravel.config';
import { qwikRollupConfig, qwikViteConfig } from './qwik.config';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  const host = env.VITE_CONFIG_SERVER_HOST ?? 'localhost';
  const base = env.VITE_CONFIG_SERVER_BASE ?? '/';
  const port = Number(env.VITE_CONFIG_SERVER_PORT ?? 4000);
  const root = env.VITE_CONFIG_SERVER_ROOT;
  const buildDirectory = env.VITE_CONFIG_BUILD_DIRECTORY ?? 'static';

  return {
    server: detectServerConfig({
      host,
      port,
      base,
    }),
    base,
    root,
    build: {
      manifest: 'manifest.json',
    },
    plugins: [
      laravelVite({
        ...laravelViteConfig,
        buildDirectory,
      }),
      qwikVite(qwikViteConfig),
      qwikRollup(qwikRollupConfig),
      tsconfigPaths(),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    resolve: {
      alias: {
        '@': '/resources/assets',
      },
    },
  };
});
