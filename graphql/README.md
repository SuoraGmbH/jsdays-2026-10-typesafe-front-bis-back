# GraphQL – Hands-on

## Setup

```bash
npm run dev
```

> **Windows:** `npm run dev` startet Server und Client mit `&`, was unter Windows nicht funktioniert. Generiere zuerst die Typen und starte dann in zwei separaten Terminals:
> ```bash
> npm run generate
> npm run server   # Terminal 1
> npm run client   # Terminal 2
> ```

Öffnet den **Vite-Client** unter [http://localhost:5104](http://localhost:5104) und den **Hono-Server** auf Port 3004.

Hilfreiche URLs:
- **GraphiQL:** [http://localhost:3004/graphql](http://localhost:3004/graphql) – interaktiver Query-Explorer (Autocompletion!)

## Aufgabe

Tracks und Talks werden bereits angezeigt. Deine Aufgabe: **Speaker laden und anzeigen – und dabei erleben, dass bei GraphQL die Query den Typ bestimmt.** Schema und Resolver sind bereits fertig.

### Aufgabe 1: Ein Feld anzeigen, das in der Query steht

1. **Query** (`src/client/queries.ts`): Uncomment `GetSpeakers` – sie lädt bisher nur `id` und `name`.
2. **Typen generieren:**

   ```bash
   npm run generate
   ```

   Das liest das Schema (`schema.graphql`) + deine Queries und generiert TypeScript-Typen in `generated/`. Da `npm run dev` dein erstes Terminal belegt, führst du das in einem zweiten Terminal aus.
3. **Client** (`src/client/main.ts`): Importiere `GetSpeakers`, uncomment den Block und ersetze „Hier kommt der Name“.

### Aufgabe 2: Ein Feld anzeigen, das in der Query fehlt

Ersetze „Hier kommt die Bio“ durch `${s.bio}` und **schau in den Editor**. Warum kennt TypeScript `bio` nicht, obwohl der Server es hat? Behebe es in der Query und generiere neu. Danach die Firma nach demselben Muster.

> **Tipp:** Welche Felder es gibt, zeigt GraphiQL mit Autocompletion (`Ctrl+Space`) oder `schema.graphql`.

> **Hinweis:** Vite prüft keine Typen – im Browser siehst du statt eines Fehlers nur `undefined`. So sähe der Fehler ohne Type-Safety aus.

## Kurzreferenz

### GraphQL-Query schreiben

```ts
import { graphql } from "../../generated/gql.js";

export const GetThings = graphql(`
  query GetThings {
    things {
      id
      name
      nested {
        field
      }
    }
  }
`);
```

Bei GraphQL bestimmst **du als Client**, welche Felder geladen werden – nicht der Server.

### Typisierter Client-Aufruf

```ts
import { GetThings } from "./queries.js";

const { things } = await client.request(GetThings);
// things[0].name → typisiert, ohne Typ-Import oder Generic!
```

`graphql()` ist generiert: Für jeden Query-Text, den der Codegen kennt, gibt es eine eigene Überladung, die das typisierte Dokument zurückgibt. `client.request()` liest den Ergebnistyp daraus ab.

### Nested Data in einer Query

GraphQL kann verschachtelte Daten in einem einzigen Request laden:

```graphql
query {
  talks {
    title
    speaker {      # ← Resolver löst die Beziehung auf
      name
    }
  }
}
```

## Stolperfallen

- **Codegen nach jeder Query-Änderung:** `npm run generate` neu ausführen (in einem zweiten Terminal). Bis dahin passt der geänderte Query-Text auf keine generierte Überladung, `graphql()` liefert `unknown` und `client.request()` meldet `No overload matches this call`.
- **Felder explizit anfordern:** GraphQL gibt nur die Felder zurück, die in der Query stehen – und der generierte Typ enthält auch nur diese. Fehlt ein Feld in der Query, meldet TypeScript den Zugriff als Fehler.
- **`graphql()` statt `gql`:** Die Funktion kommt aus `generated/gql.js` und wird von `npm run generate` erzeugt (läuft auch bei `npm run dev` vorweg). Der Codegen findet die Queries über diese Aufrufe.
- **Schema vs. Query:** Das Schema (Typen, Resolver) definiert was *möglich* ist. Die Query definiert was *geladen* wird.
