import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./router.js";

const app = new Hono();

// tRPC-Handler unter /api/trpc einbinden
app.use(
  "/api/trpc/*",
  trpcServer({ router: appRouter })
);

const PORT = 3002;

console.log(`Server läuft auf http://localhost:${PORT}`);
console.log(`tRPC-Endpunkt: http://localhost:${PORT}/api/trpc`);

serve({ fetch: app.fetch, port: PORT });
