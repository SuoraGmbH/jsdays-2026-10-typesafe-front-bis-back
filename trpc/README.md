# tRPC – Hands-on

## Setup

```bash
npm run dev
```

> **Windows:** `npm run dev` startet Server und Client mit `&`, was unter Windows nicht funktioniert. Starte stattdessen in zwei separaten Terminals:
> ```bash
> npm run server   # Terminal 1
> npm run client   # Terminal 2
> ```

Öffnet den **Vite-Client** unter [http://localhost:5102](http://localhost:5102) und den **Hono-Server** auf Port 3002.

## Aufgabe

Tracks und Talks werden bereits angezeigt. Deine Aufgabe: **Speaker-Prozeduren bauen und im Client nutzen.**

### Server (`src/server/router.ts`)

1. **`listSpeakers`** – Query-Prozedur, gibt alle Speaker zurück
2. **`getSpeaker`** – Query-Prozedur mit Input `{ id: string }`, wirft `TRPCError` bei nicht gefundenem Speaker

### Client (`src/client/main.ts`)

Lade die Speaker und ersetze die Platzhalter im Template. Kein Codegen nötig – die Typen sind sofort verfügbar!

### Bonus: Speaker-Namen in den Talks

Die Talk-Cards zeigen noch die rohe `speakerId` (z. B. `s1`). Lade pro Talk den Speaker mit `getSpeaker` und zeige stattdessen den Namen an.

> **Tipp:** Mit `Promise.all(talks.map(...))` laufen die Aufrufe parallel. Wie viele HTTP-Requests siehst du danach im Network-Tab – und warum?

## Kurzreferenz

### Prozedur ohne Input

```ts
myProcedure: publicProcedure.query(() => {
  return data;
}),
```

### Prozedur mit Input

```ts
myProcedure: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    // input.id ist typisiert
  }),
```

### Fehler werfen

```ts
throw new TRPCError({
  code: "NOT_FOUND",
  message: "Nicht gefunden",
});
```

### Client-Aufruf

```ts
const items = await client.myProcedure.query();
const item = await client.myProcedure.query({ id: "123" });
```

Der Client kennt exakt die Prozeduren und deren Input/Output-Typen – alles über den `AppRouter`-Typ, der nur als `import type` im Client landet (kein Server-Code im Bundle).

## Stolperfallen

- **Kein Codegen, kein Schema** – das ist Absicht! tRPC leitet alles aus TypeScript ab. Einfach Prozedur anlegen und im Client nutzen.
- **Komma nicht vergessen:** Router-Prozeduren sind Properties eines Objekts – nach jeder Prozedur ein Komma.
- **`TRPCError`-Codes:** Verwende Standard-Codes wie `"NOT_FOUND"`, `"BAD_REQUEST"` etc. (keine HTTP-Statuscodes).
- **Type-Import:** Der Client importiert `AppRouter` als reinen Typ (`import type`). Dadurch bleibt Server-Code aus dem Client-Bundle.
