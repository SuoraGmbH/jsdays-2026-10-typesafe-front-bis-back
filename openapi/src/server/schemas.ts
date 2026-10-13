import { z } from "@hono/zod-openapi";

// --- Track ---

export const TrackSchema = z
  .object({
    id: z.string().openapi({ example: "t1" }),
    name: z.string().openapi({ example: "Frontend" }),
    color: z
      .string()
      .openapi({ example: "#3B82F6", description: "Hex-Farbe für die UI" }),
  })
  .openapi("Track");

// --- Speaker ---

export const SpeakerSchema = z
  .object({
    id: z.string().openapi({ example: "s1" }),
    name: z.string().openapi({ example: "Ada Lovelace" }),
    bio: z.string().openapi({ example: "Pionierin der Programmierung." }),
    company: z.string().openapi({ example: "Analytical Engines Ltd." }),
  })
  .openapi("Speaker");

export const SpeakerIdParamSchema = z.object({
  id: z
    .string()
    .openapi({ param: { name: "id", in: "path" }, example: "s1" }),
});

// --- Talk ---

export const TalkSchema = z
  .object({
    id: z.string().openapi({ example: "talk1" }),
    title: z.string().openapi({ example: "Type-Safe APIs mit OpenAPI" }),
    abstract: z
      .string()
      .openapi({ example: "Wie OpenAPI die API-Kommunikation verbessert." }),
    speakerId: z.string().openapi({ example: "s1" }),
    trackId: z.string().openapi({ example: "t2" }),
    startTime: z
      .string()
      .datetime()
      .openapi({ example: "2025-09-15T09:00:00Z" }),
  })
  .openapi("Talk");

export const TalkIdParamSchema = z.object({
  id: z
    .string()
    .openapi({ param: { name: "id", in: "path" }, example: "talk1" }),
});

// --- Error ---

export const ErrorSchema = z
  .object({
    message: z.string().openapi({ example: "Not Found" }),
  })
  .openapi("Error");
