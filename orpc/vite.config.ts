import { defineConfig } from "vite";

export default defineConfig({
  root: "src/client",
  server: {
    port: 5103,
    proxy: {
      "/api": "http://localhost:3003",
      "/rpc": "http://localhost:3003",
      "/openapi.json": "http://localhost:3003",
    },
  },
});
