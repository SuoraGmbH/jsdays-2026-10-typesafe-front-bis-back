# oRPC – Hands-on

## Setup

```bash
npm run dev
```

> **Windows:** `npm run dev` startet Server und Client mit `&`, was unter Windows nicht funktioniert. Starte stattdessen in zwei separaten Terminals:
> ```bash
> npm run server   # Terminal 1
> npm run client   # Terminal 2
> ```

Öffnet den **Vite-Client** unter [http://localhost:5103](http://localhost:5103) und den **Hono-Server** auf Port 3003.

Hilfreiche URLs:
- **OpenAPI-Spec:** [http://localhost:3003/openapi.json](http://localhost:3003/openapi.json) – automatisch aus dem Router generiert

## Aufgabe

Tracks und Talks werden bereits angezeigt. Deine Aufgabe: **Speaker-Prozeduren bauen und im Client nutzen.**

### Server (`src/server/router.ts`)

1. **`listSpeakers`** – Prozedur mit `.route()`, `.output()` und `.handler()`
2. **`getSpeaker`** – Prozedur mit `.input()`, `.output()` und `.handler()`, wirft `ORPCError` bei nicht gefundenem Speaker
3. Beide Prozeduren im `router`-Objekt unter `speakers: { list, get }` einhängen

### Client (`src/client/main.ts`)

Lade die Speaker und ersetze die Platzhalter. Kein Codegen nötig – Typen fließen direkt über den `Router`-Typ.

### Bonus: Speaker-Namen in den Talks

Die Talk-Cards zeigen noch die rohe `speakerId` (z. B. `s1`). Lade pro Talk den Speaker mit `client.speakers.get()` und zeige stattdessen den Namen an.

> **Tipp:** Mit `Promise.all(talks.map(...))` laufen die Aufrufe parallel. Wie viele HTTP-Requests siehst du danach im Network-Tab? Vergleiche mit tRPC.

## Kurzreferenz

### Prozedur ohne Input

```ts
const list = os
  .route({ method: "GET", path: "/things", summary: "Alle laden" })
  .output(z.array(ThingSchema))
  .handler(async () => {
    return data;
  });
```

### Prozedur mit Input

```ts
const get = os
  .route({ method: "GET", path: "/things/{id}", summary: "Einzeln laden" })
  .input(z.object({ id: z.string() }))
  .output(ThingSchema)
  .handler(async ({ input }) => {
    // input.id ist typisiert
  });
```

### Fehler werfen

```ts
throw new ORPCError("NOT_FOUND", {
  message: "Nicht gefunden",
});
```

### Router-Struktur

```ts
const router = {
  things: { list, get },
};
```

### Client-Aufruf

```ts
const items = await client.things.list();
const item = await client.things.get({ id: "123" });
```

## Stolperfallen

- **`.output()` für die OpenAPI-Spec:** Der Client ist auch ohne `.output()` voll typisiert – aber ohne Output-Schema fehlt die Response-Beschreibung in der OpenAPI-Spec.
- **Pfad-Parameter:** `{id}` in der Route, `id` im Input-Schema – beides muss übereinstimmen.
- **Router-Verschachtelung:** Der Router ist ein einfaches Objekt. Die Verschachtelung (`speakers: { list, get }`) bestimmt die Client-API (`client.speakers.list()`).
- **Kein Codegen** – wie bei tRPC fließen die Typen über den `Router`-Typ direkt zum Client.
- **RPC und REST parallel:** Derselbe Router bedient sowohl `/rpc` (typisierte RPC-Aufrufe) als auch `/api` (REST mit OpenAPI-Spec).
