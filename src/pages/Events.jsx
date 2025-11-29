import { useState } from "react";
import { Link } from "react-router-dom";
import RegistrationModal from "../components/RegistrationModal"; 

export default function Events() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);

  // ---------- DATA ----------
  const upcomingEvents = [
    {
      id: "codewars-stage2",
      name: "CodeWars — Stage 2: Coding Round",
      desc: "Coding round focused on core C programming & web dev for shortlisted students.",
      date: "Announced soon",
      level: "Medium",
      poster: "/posters/codewars-basic-c.jpg",
      registrationOpen: false,
    },
  ];

  const completedEvents = [
    {
      id: "codewars-stage1",
      name: "CodeWars — Stage 1: Quiz round",
      desc: "Online quiz round conducted by CodeVastra.",
      date: "18 Nov 2025",
      level: "Open for all Years",
      poster: "/posters/codewars-stage1.jpg",
    },
  ];

  // ---------- RENDER HELPERS ----------
  const renderEventCard = (event, type) => {
    const base =
      "rounded-xl border bg-white shadow-sm flex flex-col overflow-hidden h-full";

    return (
      <article key={event.id} className={base}>
        {/* Poster */}
        {event.poster && (
          <div className="w-full aspect-[16/9] overflow-hidden bg-slate-200">
            <img
              src={event.poster}
              alt={event.name}
              className="h-full w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() =>
                setPosterPreview({ src: event.poster, alt: event.name })
              }
            />
          </div>
        )}

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">{event.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{event.level}</p>
            </div>

            <span className="text-xs px-2 py-1 rounded-full bg-white/90 border border-slate-200 text-slate-700">
              {event.date}
            </span>
          </div>

          <p className="text-sm text-slate-700 mt-3 leading-relaxed flex-1">
            {event.desc}
          </p>

          <div className="mt-4 flex items-center justify-between">

            {/* UPCOMING EVENT BUTTONS */}
            {type === "upcoming" && (
              <>
                <button
                  disabled={!event.registrationOpen}
                  onClick={() => setActiveEvent(event)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    event.registrationOpen
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-slate-100 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {event.registrationOpen ? "Register" : "Registration closed"}
                </button>

                 <Link
                  to={`/gallery/${event.id}`}
                  className="text-sm text-orange-600 hover:underline"
                >
                  View photos→
                </Link>

        <Link
  to={`/selected/${event.id}`}
  className="text-sm text-orange-600 hover:underline"
>
  View selected student →
</Link>

              </>
            )}

            {/* COMPLETED EVENT BUTTONS */}
            {type === "completed" && (
              <>
                <div className="flex gap-4 items-center">
                  <Link
                    to={`/gallery/${event.id}`}
                    className="text-sm text-orange-600 hover:underline"
                  >
                    View photos →
                  </Link>

                  {/* RESULT BUTTON HERE */}
                  <Link
                    to={`/results/${event.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View result →
                  </Link>
                </div>

                <span className="text-xs text-slate-500">{event.date}</span>
              </>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Events</h2>
        <p className="mt-1 text-sm text-slate-600">
          CodeVastra events — upcoming and completed.
        </p>
      </header>

      {/* UPCOMING */}
      {upcomingEvents.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-orange-700">
                Upcoming: Stage 2
              </h3>
              <p className="text-sm text-slate-600">
                Coding Round for shortlisted participants.
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
              Registration Closed
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((e) => renderEventCard(e, "upcoming"))}
          </div>
        </section>
      )}

      {/* COMPLETED */}
      {completedEvents.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Completed Events
              </h3>
              <p className="text-xs text-slate-600">
                Past sessions and competitions.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-slate-100 text-green-700 text-xs font-semibold">
              Successfully conducted
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {completedEvents.map((e) => renderEventCard(e, "completed"))}
          </div>
        </section>
      )}

      {/* Poster preview modal */}
      {posterPreview && (
        <div
          onClick={() => setPosterPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <img
            src={posterPreview.src}
            alt={posterPreview.alt}
            className="max-w-[95%] max-h-[95%] rounded-lg shadow-xl object-contain"
          />
        </div>
      )}

      {/* Registration modal */}
      {typeof RegistrationModal !== "undefined" && (
        <RegistrationModal
          open={!!activeEvent}
          eventName={activeEvent?.name}
          onClose={() => setActiveEvent(null)}
        />
      )}
    </>
  );
}
