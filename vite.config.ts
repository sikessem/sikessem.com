import laravel, { refreshPaths } from "laravel-vite-plugin";
import {
  type ConfigEnv,
  defineConfig,
  loadEnv,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildDirectory = env.VITE_CONFIG_BUILD_DIRECTORY || "static";
  const host = env.VITE_CONFIG_SERVER_HOST || "localhost";
  const base =
    (env.VITE_CONFIG_SERVER_BASE || "/") +
    (command === "build" ? buildDirectory : "");
  const port = Number(env.VITE_CONFIG_SERVER_PORT ?? 4000);
  const root = env.VITE_CONFIG_SERVER_ROOT;

  return {
    base,
    root,
    plugins: [
      laravel({
        input: ["resources/styles/global.css", "resources/designs/app.ts"],
        refresh: [...refreshPaths, "app/View/**"],
        buildDirectory,
      }),
      tsconfigPaths(),
    ],
    server: { host, port, base },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    resolve: {
      alias: {
        "@/": "/resources/assets",
        "~/": "/resources/designs",
      },
    },
  };
});
