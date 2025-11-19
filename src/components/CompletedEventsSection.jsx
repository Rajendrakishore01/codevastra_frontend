const completedEvents = [
  {
    name: "CodeWars — Stage 1",
    date: "18 Nov 2025",
    type: "C Programming & Web Development",
    description:
      "First stage of CodeWars with problem-solving rounds, hands-on coding and time-based challenges.",
    stats: "150+ participants · 3 winners · 7 special mentions",
  },
  // future me aur bhi add kar sakta hai:
  // {
  //   name: "CodeWars — Stage 2",
  //   date: "20 Dec 2025",
  //   type: "Advanced Web & DSA",
  //   description: "...",
  //   stats: "..."
  // }
];

export default function CompletedEventsSection() {
  return (
    <section className="mt-16">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Completed Events
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Highlights from past CodeVastra events at IIMT Engineering College.
            </p>
          </div>
          <span className="hidden md:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            ✅ Successfully Conducted
          </span>
        </div>

        {/* Event cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {completedEvents.map((event) => (
            <div
              key={event.name}
              className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm p-4 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    CodeVastra · Coding Club
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {event.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">{event.type}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-slate-900 text-white">
                    Completed
                  </span>
                  <p className="mt-2 text-xs text-slate-500">{event.date}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                <span>{event.stats}</span>
                <button className="text-orange-600 font-semibold hover:text-orange-700">
                  View photos / results →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
