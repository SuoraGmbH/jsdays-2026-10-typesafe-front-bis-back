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


  const speakers = await client.listSpeakers.query();
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
