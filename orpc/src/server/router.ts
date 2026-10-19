import { os, ORPCError } from "@orpc/server";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  ErrorSchema,
  SpeakerSchema,
  TalkSchema,
  TrackSchema,
} from "./schemas.js";

// --- Daten aus JSON-Datei laden ---

const __dirname = dirname(fileURLToPath(import.meta.url));

interface ConferenceData {
  tracks: z.infer<typeof TrackSchema>[];
  speakers: z.infer<typeof SpeakerSchema>[];
  talks: z.infer<typeof TalkSchema>[];
}

function loadData(): ConferenceData {
  const raw = readFileSync(join(__dirname, "../../data.json"), "utf-8");
  return JSON.parse(raw) as ConferenceData;
}

// --- Procedures ---

// --- Tracks ---

const listTracks = os
  .route({ method: "GET", path: "/tracks", summary: "Alle Tracks auflisten" })
  .output(z.array(TrackSchema))
  .handler(async () => {
    const { tracks } = loadData();
    return tracks;
  });

// --- Talks ---

const listTalks = os
  .route({ method: "GET", path: "/talks", summary: "Alle Talks auflisten" })
  .output(z.array(TalkSchema))
  .handler(async () => {
    const { talks } = loadData();
    return talks;
  });

const getTalk = os
  .route({ method: "GET", path: "/talks/{id}", summary: "Einzelnen Talk laden" })
  .input(z.object({ id: z.string() }))
  .output(TalkSchema)
  .handler(async ({ input }) => {
    const { talks } = loadData();
    const talk = talks.find((t) => t.id === input.id);
    if (!talk) {
      throw new ORPCError("NOT_FOUND", { message: "Talk nicht gefunden" });
    }
    return talk;
  });

// --- Speakers ---

const listSpeakers = os
  .route({ method: "GET", path: "/speakers", summary: "Alle Speaker auflisten" })
  .output(z.array(SpeakerSchema))
  .handler(async () => {
    const { speakers } = loadData();
    return speakers;
  });

const getSpeaker = os
  .route({ method: "GET", path: "/speakers/{id}", summary: "Einzelnen Speaker laden" })
  .input(z.object({ id: z.string() }))
  .output(SpeakerSchema)
  .handler(async ({ input }) => {
    const { speakers } = loadData();
    const speaker = speakers.find((s) => s.id === input.id);
    if (!speaker) {
      throw new ORPCError("NOT_FOUND", { message: "Speaker nicht gefunden" });
    }
    return speaker;
  });

// --- Router ---
// oRPC-Router ist ein einfaches Objekt – Typen fließen automatisch zum Client

export const router = {
  tracks: {
    list: listTracks,
  },
  talks: {
    list: listTalks,
    get: getTalk,
  },
  speakers: {
    list: listSpeakers,
    get: getSpeaker,
  },
};

// Typ-Export für den Client (kein Codegen nötig!)
export type Router = typeof router;
