// GraphQL Query-Dokumente
// Diese werden vom Codegen gelesen und daraus TypeScript-Typen generiert.
// Der Client bestimmt hier exakt welche Felder er braucht –
// das ist der zentrale Vorteil von GraphQL gegenüber REST.

import { graphql } from "../../generated/gql.js";

// --- Tracks ---

export const GetTracks = graphql(`
  query GetTracks {
    tracks {
      id
      name
      color
    }
  }
`);

// --- Talks mit verschachtelten Daten ---
// Anders als bei REST können wir Speaker- und Track-Daten
// direkt in der Talk-Query mitladen – eine einzige Anfrage!

export const GetTalks = graphql(`
  query GetTalks {
    talks {
      id
      title
      abstract
      startTime
      speaker {
        name
      }
      track {
        name
        color
      }
    }
  }
`);

export const GetTalk = graphql(`
  query GetTalk($id: ID!) {
    talk(id: $id) {
      id
      title
      abstract
      startTime
      speaker {
        name
        company
      }
      track {
        name
        color
      }
    }
  }
`);

// --- Speakers ---
// Aufgabe 1:
// 1. Uncomment die Query unten – sie lädt bisher nur id und name
// 2. Führe `npm run generate` aus um die Typen zu aktualisieren
// 3. Nutze die Query in main.ts (siehe Kommentar dort)
//
// Aufgabe 2 (nach dem Kommentar in main.ts):
// Ergänze hier das fehlende Feld, führe `npm run generate` erneut
// aus und schau, ob der Fehler in main.ts verschwindet.
//
// Wichtig: Nach jeder Änderung an einer Query `npm run generate`!
// Vorher kennt graphql() den neuen Query-Text nicht und liefert `unknown` –
// main.ts meldet dann „No overload matches this call“ bei client.request().
//
// Tipp: Welche Felder ein Speaker hat, zeigt GraphiQL
//       (http://localhost:3004/graphql, Ctrl+Space) oder schema.graphql.
//
// export const GetSpeakers = graphql(`
//   query GetSpeakers {
//     speakers {
//       id
//       name
//     }
//   }
// `);

