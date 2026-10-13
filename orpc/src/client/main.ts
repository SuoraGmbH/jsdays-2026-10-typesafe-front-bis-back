import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { Router } from "../server/router.js";

// --- Typsicherer Client – Typen fließen direkt aus dem Router (kein Codegen!) ---

const link = new RPCLink({
  url: `${window.location.origin}/rpc`,
});

const client: RouterClient<Router> = createORPCClient(link);

const app = document.getElementById("app")!;

async function render() {
  let html = "";

  // --- Tracks ---
  try {
    const tracks = await client.tracks.list();
    html += `<h2>Tracks</h2>`;
    tracks.forEach((t) => {
      html += `<span class="tag" style="background:${t.color}">${t.name}</span> `;
    });
  } catch (e) {
    app.innerHTML = `<div class="error">Fehler: Server erreichbar? (npm run server)</div>`;
    return;
  }

  // --- Talks ---
  const talks = await client.talks.list();
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
  // 1. Rufe die Speaker mit client.speakers.list() ab
  //    (funktioniert erst nachdem du die Prozeduren im Router
  //    definiert und zum Router-Objekt hinzugefügt hast)
  // 2. Ersetze die Platzhalter im Template unten durch die
  //    richtigen Felder – tippe s. und schau was die
  //    Autovervollständigung vorschlägt!
  //
  // Uncomment und ergänze:
  // const speakers = await client.speakers.list();
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
