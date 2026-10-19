import createClient from "openapi-fetch";
import type { paths } from "../../generated/api.js";

const client = createClient<paths>({ baseUrl: "/" });
const app = document.getElementById("app")!;

async function render() {
  let html = "";

  // --- Tracks ---
  const { data: tracks, error: tracksError } = await client.GET("/api/tracks");
  if (tracksError) {
    app.innerHTML = `<div class="error">Fehler: Server erreichbar? (npm run server)</div>`;
    return;
  }
  html += `<h2>Tracks</h2>`;
  tracks.forEach((t) => {
    html += `<span class="tag" style="background:${t.color}">${t.name}</span> `;
  });

  // --- Talks ---
  const { data: talks } = await client.GET("/api/talks");
  if (talks) {
    html += `<h2>Talks</h2>`;
    talks.forEach((t) => {
      html += `
        <div class="card">
          <h3>${t.title}</h3>
          <p>${t.abstract}</p>
          <p><small>Speaker: ${t.speakerId} · Track: ${t.trackId}</small></p>
        </div>`;
    });
  }


  const { data: speakers } = await client.GET("/api/speakers");
  if (speakers) {
    html += `<h2>Speaker</h2>`;
    speakers.forEach((s) => {
      html += `
        <div class="card">
          <h3>${s.name}</h3>
          <p>${s.bio}</p>
          <p><small>${s.company}</small></p>
        </div>`;
    });
  }

  app.innerHTML = html;
}

render();
