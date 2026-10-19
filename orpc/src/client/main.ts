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


  const speakers = await client.speakers.list();
  html += `<h2>Speaker</h2>`;
  speakers.forEach((s) => {
    html += `
      <div class="card">
        <h3>${s.name}</h3>
        <p>${s.bio}</p>
        <p><small>${s.company}</small></p>
      </div>`;
  });

  app.innerHTML = html;
}

render();
