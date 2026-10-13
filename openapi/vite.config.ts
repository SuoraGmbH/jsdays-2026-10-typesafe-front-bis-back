import { defineConfig } from "vite";

export default defineConfig({
  root: "src/client",
  server: {
    port: 5101,
    proxy: {
      "/api": "http://localhost:3001",
      "/openapi.json": "http://localhost:3001",
    },
  },
});
