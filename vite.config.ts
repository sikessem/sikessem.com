import { qwikVite } from "@builder.io/qwik/optimizer";
import {
  type ConfigEnv,
  type ServerOptions,
  defineConfig,
  loadEnv,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  const host = env.VITE_CONFIG_SERVER_HOST ?? "localhost";
  const base = env.VITE_CONFIG_SERVER_BASE ?? "/";
  const port = Number(env.VITE_CONFIG_SERVER_PORT ?? 4000);
  const root = env.VITE_CONFIG_SERVER_ROOT;

  return {
    base,
    root,
    plugins: [
      qwikVite({
        csr: true,
      }),
      tsconfigPaths(),
    ],
    server: {
      host,
      port,
      base,
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    build: {
      manifest: "manifest.json",
    },
    resolve: {
      alias: {
        "@/": "/app",
        "~/": "/config",
      },
    },
  };
});
