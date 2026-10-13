import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { TrackSchema, SpeakerSchema, TalkSchema } from "./schemas.js";

// --- tRPC initialisieren ---

const t = initTRPC.create();
const publicProcedure = t.procedure;

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

// --- Router ---

export const appRouter = t.router({
  // --- Tracks ---

  listTracks: publicProcedure.query(() => {
    const { tracks } = loadData();
    return tracks;
  }),

  // --- Talks ---

  listTalks: publicProcedure.query(() => {
    const { talks } = loadData();
    return talks;
  }),

  getTalk: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const { talks } = loadData();
    const talk = talks.find((t) => t.id === input.id);
    if (!talk) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Talk nicht gefunden" });
    }
    return talk;
  }),

  // --- Speakers ---
  //
  // Implementiere die folgenden zwei Prozeduren:
  //
  // Aufgabe 1: listSpeakers – Liste aller Speaker
  //   - Erstelle eine Query-Prozedur analog zu listTracks
  //   - Gib alle Speaker aus data.json zurück
  //
  // Aufgabe 2: getSpeaker – Einzelnen Speaker laden
  //   - Erstelle eine Query-Prozedur mit Input { id: string }
  //   - Wirf einen TRPCError mit code "NOT_FOUND" wenn der Speaker nicht existiert
  //
  // Tipp: Schau dir die Track- und Talk-Prozeduren als Vorlage an.
  //       Bei tRPC brauchst du keine Route-Definition – einfach
  //       eine Funktion mit optionalem .input() und .query()!

});

// Typ-Export – DAS ist der Schlüssel zu tRPC's Type-Safety!
// Der Client importiert nur diesen Typ (kein Runtime-Code).
export type AppRouter = typeof appRouter;
