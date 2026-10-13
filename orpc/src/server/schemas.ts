import { z } from "zod";

// --- Track ---

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

// --- Error ---

export const ErrorSchema = z.object({
  message: z.string(),
});
