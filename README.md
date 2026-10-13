# Hands-on Übungen

Willkommen! In diesen Übungen baust du typsichere API-Kommunikation mit verschiedenen Ansätzen.

**Jede Übung folgt dem gleichen Muster:** Tracks und Talks funktionieren bereits – du implementierst die **Speaker-Endpoints** nach dem gleichen Muster. Teilweise ist das Backend vorbereitet, teilweise nicht.

## Übungen

| Übung | Ansatz | Port | Beschreibung |
|-------|--------|------|--------------|
| [openapi/](openapi/) | OpenAPI | [localhost:5101](http://localhost:5101) | Generiertes OpenAPI-Schema mit Code-Generierung |
| [trpc/](trpc/) | tRPC | [localhost:5102](http://localhost:5102) | End-to-End Type-Safety ohne Schema |
| [orpc/](orpc/) | oRPC | [localhost:5103](http://localhost:5103) | Wie tRPC, aber mit OpenAPI-Kompatibilität |
| [graphql/](graphql/) | GraphQL | [localhost:5104](http://localhost:5104) | Schema + Codegen, Client bestimmt die Felder |
| [server-functions/](server-functions/) | Server Functions | [localhost:3005](http://localhost:3005) | Next.js – kein API-Layer, alles in einem *(optional)* |

## Schnellstart

Voraussetzung: **Node.js 22** (mindestens 22.12).

```bash
npm install
cd <übung>/
npm run dev
```

Jede Übung hat eine eigene **README** mit der genauen Aufgabenstellung und einer Kurzreferenz.

## Tipps

- **Autovervollständigung nutzen!** Tippe `s.` und lass dir die Felder vorschlagen - danke, Type-Safety.
- Die Platzhalter im Client-Code (`"Hier kommt der Name"`) ersetzt du durch Template-Literals wie `${s.name}`.
- Schau dir die bestehenden Track- und Talk-Implementierungen als Vorlage an.
- Copy & Paste nicht einfach die existierenden Implementierungen, versuch es selber zu machen :)
