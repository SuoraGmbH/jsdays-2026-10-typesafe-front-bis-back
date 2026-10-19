import { GraphQLClient } from "graphql-request";
import { GetTracks } from "./queries.js";
import { GetTalks } from "./queries.js";
import { GetSpeakers } from "./queries.js";

// GraphQL-Client – Vite proxied /graphql zum Server (siehe vite.config.ts)
const client = new GraphQLClient(`${window.location.origin}/graphql`);
const app = document.getElementById("app")!;

async function render() {
  let html = "";

  // --- Tracks ---
  try {
    const { tracks } = await client.request(GetTracks);
    html += `<h2>Tracks</h2>`;
    tracks.forEach((t) => {
      html += `<span class="tag" style="background:${t.color}">${t.name}</span> `;
    });
  } catch {
    app.innerHTML = `<div class="error">Fehler: Server erreichbar? (npm run server)</div>`;
    return;
  }

  // --- Talks ---
  // Beachte: Speaker-Name und Track-Daten kommen direkt aus der
  // verschachtelten Query – kein zweiter Request nötig!
  try {
    const { talks } = await client.request(GetTalks);
    html += `<h2>Talks</h2>`;
    talks.forEach((t) => {
      html += `
        <div class="card">
          <h3>${t.title}</h3>
          <p>${t.abstract}</p>
          <p><small>Speaker: ${t.speaker?.name ?? "–"} · Track: ${t.track ? `<span class="tag" style="background:${t.track.color}">${t.track.name}</span>` : "–"}</small></p>
        </div>`;
    });
  } catch (e) {
    html += `<div class="error">Fehler beim Laden der Talks</div>`;
  }


  try {
    const { speakers } = await client.request(GetSpeakers);
    html += `<h2>Speaker</h2>`;
    speakers.forEach((s) => {
      html += `
        <div class="card">
          <h3>${s.name}</h3>
          <p>${s.bio}</p>
          <p><small>${s.company}</small></p>
        </div>`;
    });
  } catch (e) {
    html += `<div class="error">Fehler beim Laden der Speaker</div>`;
  }

  app.innerHTML = html;
}

render();
