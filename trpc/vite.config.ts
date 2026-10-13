import { defineConfig } from "vite";

export default defineConfig({
  root: "src/client",
  server: {
    port: 5102,
    proxy: {
      "/api": "http://localhost:3002",
    },
  },
});
