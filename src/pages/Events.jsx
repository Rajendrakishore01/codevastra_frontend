import { useState } from "react";
import RegistrationModal from "../components/RegistrationModal";

export default function Events() {
  const [activeEvent, setActiveEvent] = useState(null);

  const events = [
    {
      id: "codewars-c",
      name: "CodeWars — Basic C",
      desc: "MCQ + coding questions on basic C programming.",
    },
    {
      id: "webdev-sprint",
      name: "WebDev Sprint",
      desc: "Quick web project with HTML / CSS / JS.",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {events.map((e) => (
          <article
            key={e.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <h3 className="font-semibold">{e.name}</h3>
            <p className="text-sm text-slate-600 mt-1">{e.desc}</p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => setActiveEvent(e.name)}
                className="px-3 py-2 bg-orange-500 text-white rounded text-sm"
              >
                Register
              </button>
            </div>
          </article>
        ))}
      </div>

      <RegistrationModal
        open={!!activeEvent}
        eventName={activeEvent}
        onClose={() => setActiveEvent(null)}
      />
    </>
  );
}
