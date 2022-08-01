import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api/v1": "http://localhost:4000/",
    },
  },
});
