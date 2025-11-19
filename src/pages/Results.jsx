import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Results() {
  const [events, setEvents] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("codevastra_results") || "[]");
    setEvents(stored);
  }, []);

  const focusedEvent = eventId ? events.find((e) => e.id === eventId) : null;

  const renderEventBlock = (ev) => {
    const validStudents = (ev.students || []).filter((s) => s && s.rank != null);
    const topRank = validStudents.length ? Math.min(...validStudents.map((s) => s.rank)) : null;
    const topStudents = topRank != null ? validStudents.filter((s) => s.rank === topRank) : [];

    return (
      <div key={ev.id} className="rounded-xl border p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{ev.event}</h3>
            <p className="text-xs text-slate-500">{ev.date}</p>
          </div>

          <div className="text-right">
            {topStudents.length > 0 ? (
              <div className="text-sm">
                <div className="text-xs text-slate-500">Top student</div>
                <div className="font-semibold">
                  {topStudents.map((s) => s.name).join(", ")}
                  {topStudents.length > 1 ? ` (tie, rank ${topRank})` : ` — Rank ${topRank}`}
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">No result</div>
            )}
          </div>
        </div>

        <div className="mt-4 overflow-auto">
          {validStudents.length > 0 ? (
            <table className="w-full border">
              <thead className="bg-slate-100 text-sm">
                <tr>
                  <th className="border p-2">Rank</th>
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {ev.students.map((s, i) => (
                  <tr key={i}>
                    <td className="border p-2 text-center">{s.rank ?? "-"}</td>
                    <td className="border p-2">{s.name ?? "-"}</td>
                    <td className="border p-2">{s.score ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-slate-600">
              <div className="text-lg font-semibold">Not announced yet</div>
              <div className="mt-2 text-sm">Results will appear here after admin publishes them.</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Event Results</h2>
            <p className="mt-1 text-sm text-slate-600">
              {eventId ? "Event-specific result" : "All published results"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {eventId ? (
            focusedEvent ? (
              renderEventBlock(focusedEvent)
            ) : (
              <div className="rounded-lg border p-6 bg-white text-center text-slate-600">
                <div className="text-xl font-semibold">Not announced yet</div>
                <div className="mt-2 text-sm">No published result for this event.</div>
              </div>
            )
          ) : (
            <>
              {events.length === 0 && (
                <div className="rounded-lg border p-6 bg-white text-center text-slate-600">
                  <div className="text-xl font-semibold">No results announced yet</div>
                  <div className="mt-2 text-sm">Results will appear here after admin publishes them.</div>
                </div>
              )}

              {events.map((ev) => renderEventBlock(ev))}
            </>
          )}
        </div>
      </main>

      
    </div>
  );
}
