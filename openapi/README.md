# OpenAPI – Hands-on

## Setup

```bash
npm run dev
```

> **Windows:** `npm run dev` startet Server und Client mit `&`, was unter Windows nicht funktioniert. Starte stattdessen in zwei separaten Terminals:
> ```bash
> npm run server   # Terminal 1
> npm run client   # Terminal 2
> ```

App läuft unter [http://localhost:5101](http://localhost:5101).

Hilfreiche URLs:
- **Swagger UI:** [http://localhost:3001/docs](http://localhost:3001/docs) – interaktive API-Dokumentation
- **OpenAPI-Spec:** [http://localhost:3001/openapi.json](http://localhost:3001/openapi.json) – maschinenlesbares Schema

## Aufgabe

Tracks und Talks werden bereits angezeigt. Die Speaker-Routen und generierten Typen sind auch schon fertig – **deine Aufgabe ist es, die Speaker im Client zu laden und anzuzeigen.**

### Client (`src/client/main.ts`)

1. Speaker-Daten mit `client.GET("/api/speakers")` laden
2. Die Platzhalter im Template durch die richtigen Felder ersetzen – tippe `s.` und schau was die Autovervollständigung vorschlägt!

> **Tipp:** Öffne die [Swagger UI](http://localhost:3001/docs), um die verfügbaren Endpoints und ihre Responses zu erkunden. Schau dir auch `src/server/routes.ts` an, um zu sehen wie die Routen definiert sind.

### Bonus: Ein neues Feld

Gib den Speakern ein neues Feld, z. B. `country`:

1. In `data.json` bei jedem Speaker einen Wert eintragen
2. In `src/server/schemas.ts` das Feld im `SpeakerSchema` ergänzen
3. Das Feld im Client anzeigen – was sagt TypeScript?
4. `npm run generate` in einem zweiten Terminal ausführen (der Server muss laufen) – und nochmal schauen

Der Client kennt nur, was in der generierten Spec steht. Ohne `generate` sind Server und Client nicht synchron.

## Kurzreferenz

### Route definieren

```ts
const myRoute = createRoute({
  method: "get",
  path: "/api/things/{id}",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      content: { "application/json": { schema: ThingSchema } },
      description: "Erfolg",
    },
    404: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Nicht gefunden",
    },
  },
});
```

### Route registrieren

```ts
router.openapi(myRoute, (c) => {
  const { id } = c.req.valid("param");
  // ...
  return c.json(result);
});
```

### Client-Aufruf

```ts
const { data, error } = await client.GET("/api/things/{id}", {
  params: { path: { id: "123" } },
});
```

`client.GET` kennt nur Pfade, die in der generierten Spec existieren – Tippfehler werden vom Compiler erkannt.

## Stolperfallen

- **Pfad-Parameter im Client:** `params: { path: { id: "123" } }` – nicht einfach `{ id: "123" }`.
- **`client.GET` kennt nur existierende Pfade** – Tippfehler im Pfad-String werden vom Compiler erkannt.
- **Destructuring:** `client.GET` gibt `{ data, error }` zurück. Prüfe `error` oder `data` vor dem Zugriff.
