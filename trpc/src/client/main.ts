import { createTRPCClient, httpBatchLink } from "@trpc/client";
// Nur der TYP wird importiert – kein Server-Code im Client-Bundle!
import type { AppRouter } from "../server/router.js";

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});

const app = document.getElementById("app")!;

async function render() {
  let html = "";

  // --- Tracks ---
  try {
    const tracks = await client.listTracks.query();
    html += `<h2>Tracks</h2>`;
    tracks.forEach((t) => {
      html += `<span class="tag" style="background:${t.color}">${t.name}</span> `;
    });
  } catch {
    app.innerHTML = `<div class="error">Fehler: Server erreichbar? (npm run server)</div>`;
    return;
  }

  // --- Talks ---
  const talks = await client.listTalks.query();
  html += `<h2>Talks</h2>`;
  talks.forEach((t) => {
    html += `
      <div class="card">
        <h3>${t.title}</h3>
        <p>${t.abstract}</p>
        <p><small>Speaker: ${t.speakerId} · Track: ${t.trackId}</small></p>
      </div>`;
  });

  // --- Speakers ---
  // Aufgabe:
  // 1. Lade die Speaker mit client.listSpeakers.query()
  //    (funktioniert erst nachdem du die Prozedur im Router
  //    implementiert hast – kein Codegen nötig!)
  // 2. Ersetze die Platzhalter im Template unten durch die
  //    richtigen Felder – tippe s. und schau was die
  //    Autovervollständigung vorschlägt!
  //
  // Uncomment und ergänze:
  // const speakers = await client.listSpeakers.query();
  // html += `<h2>Speaker</h2>`;
  // speakers.forEach((s) => {
  //   html += `
  //     <div class="card">
  //       <h3>Hier kommt der Name</h3>
  //       <p>Hier kommt die Bio</p>
  //       <p><small>Hier kommt die Firma</small></p>
  //     </div>`;
  // });


  app.innerHTML = html;
}

render();
