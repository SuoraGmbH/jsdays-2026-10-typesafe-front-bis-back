import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // Schema wird direkt aus der lokalen Datei gelesen (kein laufender Server nötig)
  schema: "./schema.graphql",
  // Client-Queries (`graphql(...)`-Aufrufe) als Quelle für Operationstypen
  documents: "./src/client/**/*.ts",
  // Leeres Projekt (alle Queries auskommentiert) ist kein Fehler
  ignoreNoDocuments: true,
  generates: {
    "./generated/": {
      preset: "client",
      // Wir nutzen keine Fragments – spart fragment-masking.ts
      presetConfig: { fragmentMasking: false },
      // Relative Imports mit .js-Endung (tsconfig: moduleResolution NodeNext)
      config: { importExtension: ".js" },
    },
  },
};

export default config;
