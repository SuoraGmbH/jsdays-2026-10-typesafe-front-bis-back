import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  ErrorSchema,
  SpeakerIdParamSchema,
  SpeakerSchema,
  TalkIdParamSchema,
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

// --- Router ---

export const router = new OpenAPIHono();

// --- Tracks ---

const listTracksRoute = createRoute({
  method: "get",
  path: "/api/tracks",
  tags: ["Tracks"],
  summary: "Alle Tracks auflisten",
  responses: {
    200: {
      content: { "application/json": { schema: z.array(TrackSchema) } },
      description: "Liste aller Konferenz-Tracks",
    },
  },
});

router.openapi(listTracksRoute, (c) => {
  const { tracks } = loadData();
  return c.json(tracks, 200);
});

// --- Talks ---

const listTalksRoute = createRoute({
  method: "get",
  path: "/api/talks",
  tags: ["Talks"],
  summary: "Alle Talks auflisten",
  responses: {
    200: {
      content: { "application/json": { schema: z.array(TalkSchema) } },
      description: "Liste aller Konferenz-Talks",
    },
  },
});

router.openapi(listTalksRoute, (c) => {
  const { talks } = loadData();
  return c.json(talks, 200);
});

const getTalkRoute = createRoute({
  method: "get",
  path: "/api/talks/{id}",
  tags: ["Talks"],
  summary: "Einzelnen Talk laden",
  request: { params: TalkIdParamSchema },
  responses: {
    200: {
      content: { "application/json": { schema: TalkSchema } },
      description: "Der angeforderte Talk",
    },
    404: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Talk nicht gefunden",
    },
  },
});

router.openapi(getTalkRoute, (c) => {
  const { id } = c.req.valid("param");
  const { talks } = loadData();
  const talk = talks.find((t) => t.id === id);
  if (!talk) {
    return c.json({ message: "Talk nicht gefunden" }, 404);
  }
  return c.json(talk, 200);
});

// --- Speakers ---

const listSpeakersRoute = createRoute({
  method: "get",
  path: "/api/speakers",
  tags: ["Speakers"],
  summary: "Alle Speaker auflisten",
  responses: {
    200: {
      content: { "application/json": { schema: z.array(SpeakerSchema) } },
      description: "Liste aller Konferenz-Speaker",
    },
  },
});

router.openapi(listSpeakersRoute, (c) => {
  const { speakers } = loadData();
  return c.json(speakers, 200);
});

const getSpeakerRoute = createRoute({
  method: "get",
  path: "/api/speakers/{id}",
  tags: ["Speakers"],
  summary: "Einzelnen Speaker laden",
  request: { params: SpeakerIdParamSchema },
  responses: {
    200: {
      content: { "application/json": { schema: SpeakerSchema } },
      description: "Der angeforderte Speaker",
    },
    404: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Speaker nicht gefunden",
    },
  },
});

router.openapi(getSpeakerRoute, (c) => {
  const { id } = c.req.valid("param");
  const { speakers } = loadData();
  const speaker = speakers.find((s) => s.id === id);
  if (!speaker) {
    return c.json({ message: "Speaker nicht gefunden" }, 404);
  }
  return c.json(speaker, 200);
});
