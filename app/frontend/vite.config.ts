import path from "node:path";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const rootDir = path.join(process.cwd(), "..");

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, rootDir, "");
  console.log(`Vite ${command} ${env.APP_TITLE}`);

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    resolve: {
      alias: {
        "@/": "/res/",
        "~/": "/src/",
      },
    },
    optimizeDeps: { include: ["@auth/core"] },
  };
});
