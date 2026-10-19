import { getTracks } from "@/lib/data";
import { getTalks } from "@/lib/data";
import { getSpeakers } from "@/lib/data";

export default async function Page() {
  const tracks = getTracks();

  const talks = getTalks();


  const speakers = getSpeakers();

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


      <h2>Speaker</h2>
      {speakers.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.name}</h3>
          <p>{s.bio}</p>
          <p>
            <small>{s.company}</small>
          </p>
        </div>
      ))}
    </main>
  );
}
