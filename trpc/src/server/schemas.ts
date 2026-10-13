import { z } from "zod";

// --- Track ---
// Kein .openapi()-Metadata nötig – tRPC leitet die Typen direkt aus Zod ab.

export const TrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

// --- Speaker ---

export const SpeakerSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string(),
  company: z.string(),
});

// --- Talk ---

export const TalkSchema = z.object({
  id: z.string(),
  title: z.string(),
  abstract: z.string(),
  speakerId: z.string(),
  trackId: z.string(),
  startTime: z.string().datetime(),
});
