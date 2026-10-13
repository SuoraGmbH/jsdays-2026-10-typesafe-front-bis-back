import { defineConfig } from "vite";

export default defineConfig({
  root: "src/client",
  server: {
    port: 5104,
    proxy: {
      "/graphql": "http://localhost:3004",
    },
  },
});
