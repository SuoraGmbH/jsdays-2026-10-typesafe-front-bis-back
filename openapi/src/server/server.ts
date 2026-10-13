import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { router } from "./routes.js";

const app = new OpenAPIHono();

app.route("/", router);

// OpenAPI-Spec – wird von `npm run generate` gelesen
app.doc31("/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "Conference Program API",
    version: "1.0.0",
    description: "API für das Konferenzprogramm (Talks, Speaker, Tracks)",
  },
});

// Swagger UI – interaktive Dokumentation
app.get("/docs", swaggerUI({ url: "/openapi.json" }));

const PORT = 3001;

console.log(`Server läuft auf http://localhost:${PORT}`);
console.log(`Swagger UI:     http://localhost:${PORT}/docs`);
console.log(`OpenAPI Spec:   http://localhost:${PORT}/openapi.json`);

serve({ fetch: app.fetch, port: PORT });
