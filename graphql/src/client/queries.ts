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


export const GetSpeakers = graphql(`
  query GetSpeakers {
    speakers {
      id
      name
      bio
      company
    }
  }
`);
