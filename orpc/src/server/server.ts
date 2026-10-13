import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { RPCHandler } from "@orpc/server/fetch";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { onError } from "@orpc/server";
import { router } from "./router.js";

const app = new Hono();

// --- RPC-Handler – typsichere Aufrufe vom Client ---

const rpcHandler = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await rpcHandler.handle(c.req.raw, {
    prefix: "/rpc",
    context: {},
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

// --- OpenAPI-Handler – REST-Endpunkte unter /api ---

const openAPIHandler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

app.use("/api/*", async (c, next) => {
  const { matched, response } = await openAPIHandler.handle(c.req.raw, {
    prefix: "/api",
    context: {},
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

// --- OpenAPI-Spec generieren und ausliefern ---

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

app.get("/openapi.json", async (c) => {
  const spec = await openAPIGenerator.generate(router, {
    info: {
      title: "Conference Program API (oRPC)",
      version: "1.0.0",
      description: "API für das Konferenzprogramm – erstellt mit oRPC",
    },
    servers: [{ url: "/api" }],
  });
  return c.json(spec);
});

const PORT = 3003;

console.log(`Server läuft auf http://localhost:${PORT}`);
console.log(`RPC-Endpunkt:   http://localhost:${PORT}/rpc`);
console.log(`REST-API:       http://localhost:${PORT}/api`);
console.log(`OpenAPI Spec:   http://localhost:${PORT}/openapi.json`);

serve({ fetch: app.fetch, port: PORT });
