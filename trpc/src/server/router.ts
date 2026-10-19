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

  listSpeakers: publicProcedure.query(() => {
    const { speakers } = loadData();
    return speakers;
  }),

  getSpeaker: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const { speakers } = loadData();
      const speaker = speakers.find((s) => s.id === input.id);
      if (!speaker) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Speaker nicht gefunden",
        });
      }
      return speaker;
    }),
});

// Typ-Export – DAS ist der Schlüssel zu tRPC's Type-Safety!
// Der Client importiert nur diesen Typ (kein Runtime-Code).
export type AppRouter = typeof appRouter;
