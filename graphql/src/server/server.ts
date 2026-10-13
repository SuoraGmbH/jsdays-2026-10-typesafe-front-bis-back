import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = new Hono();

// GraphQL Yoga – erstellt einen standardkonformen GraphQL-Server
// Yoga nutzt die Web-Standard Request/Response API,
// die auch Hono verwendet – daher passt die Integration nahtlos.
const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/graphql",
  // GraphiQL – interaktive Query-Oberfläche im Browser
  graphiql: true,
});

// Yoga als Handler für /graphql registrieren
app.on(["GET", "POST"], "/graphql", async (c) => {
  const response = await yoga.handle(c.req.raw);
  return response;
});

const PORT = 3004;

console.log(`Server läuft auf http://localhost:${PORT}`);
console.log(`GraphiQL:       http://localhost:${PORT}/graphql`);

serve({ fetch: app.fetch, port: PORT });
