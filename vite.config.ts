import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(`Vite ${command} ${env.APP_TITLE}`);

  return {
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
        "@/": "/app/",
        "~/": "/lib/",
      },
    },
  };
});
