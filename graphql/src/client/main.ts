import { GraphQLClient } from "graphql-request";
import { GetTracks } from "./queries.js";
import { GetTalks } from "./queries.js";

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

  // --- Speakers ---
  // Aufgabe 1:
  // 1. Importiere GetSpeakers aus ./queries.js (oben ergänzen)
  // 2. Uncomment den Block unten und ersetze "Hier kommt der Name".
  //    Tippe s. und schau was die Autovervollständigung vorschlägt!
  //
  // Aufgabe 2:
  // Ersetze "Hier kommt die Bio" durch ${s.bio} und schau in den
  // Editor (nicht in den Browser): Warum kennt TypeScript `bio` nicht,
  // obwohl der Server es hat? Behebe es in queries.ts.
  // Danach: "Hier kommt die Firma" nach demselben Muster.
  //
  // „No overload matches this call“ bei client.request()? Dann hast du
  // die Query geändert, aber `npm run generate` noch nicht ausgeführt.
  //
  // try {
  //   const { speakers } = await client.request(GetSpeakers);
  //   html += `<h2>Speaker</h2>`;
  //   speakers.forEach((s) => {
  //     html += `
  //       <div class="card">
  //         <h3>Hier kommt der Name</h3>
  //         <p>Hier kommt die Bio</p>
  //         <p><small>Hier kommt die Firma</small></p>
  //       </div>`;
  //   });
  // } catch (e) {
  //   html += `<div class="error">Fehler beim Laden der Speaker</div>`;
  // }


  app.innerHTML = html;
}

render();
