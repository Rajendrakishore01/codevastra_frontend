import { useState, useEffect } from "react";

export default function CountdownTimer({ eventName = "Event starts in", eventDate }) {
  const calculateTimeLeft = () => {
    const target = new Date(eventDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!timeLeft) {
    return (
      <p className="text-sm font-semibold text-emerald-600">
        Event started / completed 🚀
      </p>
    );
  }

  return (
    <div className="mt-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-2">
        {eventName}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {["days", "hours", "minutes", "seconds"].map((key) => (
          <div
            key={key}
            className="rounded-lg bg-black/90 text-white py-2 text-center flex flex-col gap-0.5"
          >
            <span className="text-lg font-bold leading-none">
              {timeLeft[key]}
            </span>
            <span className="text-[10px] uppercase tracking-wide">
              {key === "days"
                ? "Days"
                : key === "hours"
                ? "Hrs"
                : key === "minutes"
                ? "Min"
                : "Sec"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
