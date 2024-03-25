import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/design/app.scss", "resources/design/app.ts"],
      refresh: true,
    }),
  ],
  resolve: {
    alias: {
      "@assets": "resources/assets",
    },
  },
});
