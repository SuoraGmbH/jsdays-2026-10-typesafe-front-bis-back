import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Daten aus JSON-Datei laden ---

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Track {
  id: string;
  name: string;
  color: string;
}

interface Speaker {
  id: string;
  name: string;
  bio: string;
  company: string;
}

interface Talk {
  id: string;
  title: string;
  abstract: string;
  speakerId: string;
  trackId: string;
  startTime: string;
}

interface ConferenceData {
  tracks: Track[];
  speakers: Speaker[];
  talks: Talk[];
}

function loadData(): ConferenceData {
  const raw = readFileSync(join(__dirname, "../../data.json"), "utf-8");
  return JSON.parse(raw) as ConferenceData;
}

// --- Resolver ---
// Resolver bilden das Schema auf die Datenquellen ab.
// Verschachtelte Resolver (Talk.speaker, Talk.track) ermöglichen
// dem Client, verknüpfte Daten in einer Query zu laden.

export const resolvers = {
  Query: {
    tracks: () => {
      const { tracks } = loadData();
      return tracks;
    },

    talks: () => {
      const { talks } = loadData();
      return talks;
    },

    talk: (_: unknown, { id }: { id: string }) => {
      const { talks } = loadData();
      return talks.find((t) => t.id === id) ?? null;
    },

    speakers: () => {
      const { speakers } = loadData();
      return speakers;
    },

    speaker: (_: unknown, { id }: { id: string }) => {
      const { speakers } = loadData();
      return speakers.find((s) => s.id === id) ?? null;
    },
  },

  // Verschachtelte Resolver – lösen Beziehungen auf
  Talk: {
    speaker: (talk: Talk) => {
      const { speakers } = loadData();
      return speakers.find((s) => s.id === talk.speakerId) ?? null;
    },
    track: (talk: Talk) => {
      const { tracks } = loadData();
      return tracks.find((t) => t.id === talk.trackId) ?? null;
    },
  },
};
