// GraphQL-Schema in SDL (Schema Definition Language)
// Der Client bestimmt über Queries welche Felder er braucht –
// das ist der zentrale Unterschied zu REST/OpenAPI.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const typeDefs = readFileSync(
  join(__dirname, "../../schema.graphql"),
  "utf-8",
);
