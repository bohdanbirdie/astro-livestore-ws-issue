import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { livestoreDevtoolsPlugin } from "@livestore/devtools-vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react({ experimentalReactChildren: true })],
  vite: {
    plugins: [
      tailwindcss(),
      livestoreDevtoolsPlugin({ schemaPath: "./src/livestore/schema.ts" }),
    ],
    worker: { format: "es" },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      exclude: ["@livestore/wa-sqlite"],
    },
  },
  bypassPlatformMiddleware: (request) => {
    return request.url.includes("/_livestore");
  },
});
