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

  // --- Speakers ---
  // Aufgabe:
  // 1. Lade die Speaker mit client.GET("/api/speakers")
  //    (Route und Typen sind schon fertig – siehe Swagger UI
  //    unter http://localhost:3001/docs)
  // 2. Ersetze die Platzhalter im Template unten durch die
  //    richtigen Felder – tippe s. und schau was die
  //    Autovervollständigung vorschlägt!
  //
  // Uncomment und ergänze:
  // const { data: speakers } = await client.GET("/api/speakers");
  // if (speakers) {
  //   html += `<h2>Speaker</h2>`;
  //   speakers.forEach((s) => {
  //     html += `
  //       <div class="card">
  //         <h3>Hier kommt der Name</h3>
  //         <p>Hier kommt die Bio</p>
  //         <p><small>Hier kommt die Firma</small></p>
  //       </div>`;
  //   });
  // }


  app.innerHTML = html;
}

render();
