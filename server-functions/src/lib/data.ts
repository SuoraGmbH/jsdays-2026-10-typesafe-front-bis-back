import { readFileSync } from "node:fs";
import { join } from "node:path";

// --- Typen ---
// Kein Zod, kein Schema – die Typen fließen direkt durch TypeScript.

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
  const raw = readFileSync(join(process.cwd(), "data.json"), "utf-8");
  return JSON.parse(raw) as ConferenceData;
}

// --- Tracks ---

export function getTracks() {
  const { tracks } = loadData();
  return tracks;
}

// --- Talks ---

export function getTalks() {
  const { talks } = loadData();
  return talks;
}

export function getTalk(id: string) {
  const { talks } = loadData();
  const talk = talks.find((t) => t.id === id);
  if (!talk) {
    throw new Error("Talk nicht gefunden");
  }
  return talk;
}

// --- Speakers ---
//
// Implementiere die folgenden zwei Funktionen:
//
// Aufgabe 1: getSpeakers – Liste aller Speaker
//   - Erstelle eine Funktion analog zu getTracks
//   - Gib alle Speaker aus data.json zurück
//
// Aufgabe 2: getSpeaker – Einzelnen Speaker laden
//   - Erstelle eine Funktion mit Parameter id: string
//   - Wirf einen Error wenn der Speaker nicht existiert
//
// Tipp: Schau dir getTracks() und getTalks() als Vorlage an.
//       Keine Router, keine Schemas, keine Middleware –
//       einfach eine TypeScript-Funktion!

