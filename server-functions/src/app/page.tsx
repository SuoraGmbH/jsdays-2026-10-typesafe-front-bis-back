import { getTracks } from "@/lib/data";
import { getTalks } from "@/lib/data";

export default async function Page() {
  const tracks = getTracks();

  const talks = getTalks();

  // --- Speakers ---
  // Aufgabe:
  // 1. Implementiere getSpeakers() in src/lib/data.ts
  //    (analog zu getTracks / getTalks)
  // 2. Importiere getSpeakers oben und rufe sie hier auf
  // 3. Ergänze die Speaker-Cards im JSX unten –
  //    ersetze die Platzhalter durch die richtigen Felder.
  //    Tippe s. und schau was die Autovervollständigung vorschlägt!
  //
  // Uncomment:
  // const speakers = getSpeakers();


  return (
    <main>
      <h1>Conference Program</h1>
      <p className="subtitle">Next.js Server Functions</p>

      <h2>Tracks</h2>
      <div className="tags">
        {tracks.map((t) => (
          <span key={t.id} className="tag" style={{ background: t.color }}>
            {t.name}
          </span>
        ))}
      </div>

      <h2>Talks</h2>
      {talks.map((t) => (
        <div key={t.id} className="card">
          <h3>{t.title}</h3>
          <p>{t.abstract}</p>
          <p>
            <small>
              Speaker: {t.speakerId} · Track: {t.trackId}
            </small>
          </p>
        </div>
      ))}

      {/*
      <h2>Speaker</h2>
      {speakers.map((s) => (
        <div key={s.id} className="card">
          <h3>Hier kommt der Name</h3>
          <p>Hier kommt die Bio</p>
          <p><small>Hier kommt die Firma</small></p>
        </div>
      ))}
      */}

    </main>
  );
}
