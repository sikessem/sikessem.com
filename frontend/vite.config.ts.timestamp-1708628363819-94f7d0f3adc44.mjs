// vite.config.ts
import path from "node:path";
import { qwikCity } from "file:///labs/sikessem.com/frontend/node_modules/@builder.io/qwik-city/vite/index.mjs";
import { qwikVite } from "file:///labs/sikessem.com/frontend/node_modules/@builder.io/qwik/optimizer.mjs";
import tsconfigPaths from "file:///labs/sikessem.com/frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
import {
  defineConfig,
  loadEnv,
} from "file:///labs/sikessem.com/frontend/node_modules/vite/dist/node/index.js";
const rootDir = path.join(process.cwd(), "..");
const vite_config_default = defineConfig(({ mode, command }) => {
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
  };
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbGFicy9zaWtlc3NlbS5jb20vZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9sYWJzL3Npa2Vzc2VtLmNvbS9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbGFicy9zaWtlc3NlbS5jb20vZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBxd2lrQ2l0eSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvdml0ZVwiO1xuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcbmltcG9ydCB7IHR5cGUgQ29uZmlnRW52LCB0eXBlIFVzZXJDb25maWcsIGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG5jb25zdCByb290RGlyID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiLi5cIik7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3REaXIsIFwiXCIpO1xuICBjb25zb2xlLmxvZyhgVml0ZSAke2NvbW1hbmR9ICR7ZW52LkFQUF9USVRMRX1gKTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtxd2lrQ2l0eSgpLCBxd2lrVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICAgIHNlcnZlcjoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9MFwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwicHVibGljLCBtYXgtYWdlPTYwMFwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQC9cIjogXCIvcmVzL1wiLFxuICAgICAgICBcIn4vXCI6IFwiL3NyYy9cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtUSxPQUFPLFVBQVU7QUFDcFIsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxnQkFBZ0I7QUFDekIsU0FBMEMsY0FBYyxlQUFlO0FBQ3ZFLE9BQU8sbUJBQW1CO0FBRTFCLElBQU0sVUFBVSxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsSUFBSTtBQUU3QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLE1BQU0sUUFBUSxNQUE2QjtBQUN4RSxRQUFNLE1BQU0sUUFBUSxNQUFNLFNBQVMsRUFBRTtBQUNyQyxVQUFRLElBQUksUUFBUSxPQUFPLElBQUksSUFBSSxTQUFTLEVBQUU7QUFFOUMsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsY0FBYyxDQUFDO0FBQUEsSUFDakQsUUFBUTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ1AsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
