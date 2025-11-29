
import { useEffect, useState } from "react";


const fallbackEvents = [
  {
    id: "codewars-stage2",
    event: "CodeWars — Stage 2",
    date: "Dec 2025",
    // small sample shape
    selectedByYear: {
      "1st Year": [{ name: "Richa Sharma" }, { name: "Rashmibala" }],
      "2nd Year": [{ name: "Ashutosh Singh" }],
    },
  },
];

export default function Certificate() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [eligible, setEligible] = useState(null); // null = not checked, false = not found, object = matched student
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("codevastra_results") || "[]");
    if (stored && stored.length) {
      setEvents(stored);
      setSelectedEventId(stored[0].id || "");
    } else {
      setEvents(fallbackEvents);
      setSelectedEventId(fallbackEvents[0].id);
    }
  }, []);

  // Normalizes and searches for a match within an event record
  const findParticipant = (ev, participantName, participantYear) => {
    if (!ev || !participantName) return null;
    const target = participantName.trim().toLowerCase();

    const testName = (n) => {
      if (!n) return false;
      return n.trim().toLowerCase() === target;
    };

    // 1) selectedByYear (object of arrays)
    if (ev.selectedByYear && typeof ev.selectedByYear === "object") {
      for (const [yr, arr] of Object.entries(ev.selectedByYear)) {
        if (participantYear && yr.toLowerCase() !== participantYear.toLowerCase()) {
          // skip different year if user provided a year
        }
        if (Array.isArray(arr)) {
          const found = arr.find((s) => testName(s.name || s.Name || s.student || s.fullname));
          if (found) return { found, source: "selectedByYear", group: yr };
        }
      }
    }

    // 2) groups (object of arrays)
    if (ev.groups && typeof ev.groups === "object") {
      for (const [g, arr] of Object.entries(ev.groups)) {
        if (Array.isArray(arr)) {
          const found = arr.find((s) => testName(s.name || s.Name));
          if (found) return { found, source: "groups", group: g };
        }
      }
    }

    // 3) selected / selectedStudents (flat array)
    const flatSelected = ev.selected || ev.selectedStudents;
    if (Array.isArray(flatSelected)) {
      const found = flatSelected.find((s) => testName(s.name || s.Name));
      if (found) return { found, source: "selected" };
    }

    // 4) students[] (common in your results file)
    if (Array.isArray(ev.students)) {
      // first try students with selected flag
      const byFlag = ev.students.find((s) => (s.selected === true || s.selected === "yes") && testName(s.name));
      if (byFlag) return { found: byFlag, source: "students:selected" };

      // else try any student match
      const any = ev.students.find((s) => testName(s.name));
      if (any) return { found: any, source: "students:any" };
    }

    // 5) results array (maybe structure differs) -> try to search recursively
    if (Array.isArray(ev.results)) {
      const found = ev.results.find((r) => testName(r.name || r.fullname));
      if (found) return { found, source: "results" };
    }

    // 6) fallback: try to check names present anywhere in event raw JSON (string search)
    try {
      const raw = JSON.stringify(ev).toLowerCase();
      if (raw.includes(target)) {
        return { found: { name: participantName }, source: "raw-match" };
      }
    } catch (e) { /* ignore */ }

    return null;
  };

  const handleCheck = (e) => {
    e?.preventDefault();
    setChecking(true);
    setEligible(null);

    const ev = events.find((x) => x.id === selectedEventId);
    const res = findParticipant(ev, name, year);
    if (res) {
      setEligible(res);
    } else {
      setEligible(false);
    }
    setChecking(false);
  };

  // Canvas certificate generator
  const downloadCertificate = async () => {
    const ev = events.find((x) => x.id === selectedEventId);
    const canvas = document.createElement("canvas");
    const W = 1600;
    const H = 1100;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // background
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#fffaf0");
    grad.addColorStop(1, "#fffefc");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // border
    ctx.strokeStyle = "#f1f1f1";
    ctx.lineWidth = 14;
    roundRect(ctx, 20, 20, W - 40, H - 40, 24, false, true);

    // header: club name
    ctx.fillStyle = "#f36100";
    ctx.font = "bold 64px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("CodeVastra", 120, 150);

    // certificate title
    ctx.fillStyle = "#0f172a"; // slate-900
    ctx.font = "bold 48px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Participation", W / 2, 300);

    // decorative line
    ctx.strokeStyle = "#f3f0ee";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 300, 320);
    ctx.lineTo(W / 2 + 300, 320);
    ctx.stroke();

    // participant name
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 56px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(name, W / 2, 420);

    // small subtitle
    ctx.fillStyle = "#475569"; // slate-600
    ctx.font = "20px Inter, sans-serif";
    ctx.fillText(
      `has successfully participated in`,
      W / 2,
      470
    );

    // event name
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 28px Inter, sans-serif";
    ctx.fillText(ev?.event || selectedEventId, W / 2, 520);

    // year & date on left
    ctx.textAlign = "left";
    ctx.font = "18px Inter, sans-serif";
    ctx.fillStyle = "#475569";
    ctx.fillText(`Year: ${year || "-"}`, 120, 800);
    ctx.fillText(`Event Date: ${ev?.date || "-"}`, 120, 830);

    // signature area on right
    ctx.textAlign = "center";
    ctx.fillStyle = "#0f172a";
    ctx.fillText("____________________", W - 300, 800);
    ctx.fillText("Club Coordinator", W - 300, 840);

    // small footer
    ctx.font = "14px Inter, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "center";
    ctx.fillText("CodeVastra · IIMT Engineering College", W / 2, H - 60);

    // produce blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.replace(/\s+/g, "_")}_certificate.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  // helper to draw rounded rectangle
  const roundRect = (ctx, x, y, w, h, r, fill, stroke) => {
    if (typeof r === "undefined") r = 5;
    if (typeof r === "number") r = { tl: r, tr: r, br: r, bl: r };
    else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (const side in defaultRadius) r[side] = r[side] || defaultRadius[side];
    }
    ctx.beginPath();
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + w - r.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
    ctx.lineTo(x + w, y + h - r.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx.lineTo(x + r.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y, x + r.tl, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Certificate Generator</h2>

      <form onSubmit={handleCheck} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Select event</label>
            <select
              className="mt-2 w-full rounded-md border px-3 py-2"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.event || ev.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Year (optional)</label>
            <input
              className="mt-2 w-full rounded-md border px-3 py-2"
              placeholder="e.g. 1st Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Participant name</label>
          <input
            className="mt-2 w-full rounded-md border px-3 py-2"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600"
            disabled={checking || !name || !selectedEventId}
          >
            {checking ? "Checking..." : "Check Eligibility"}
          </button>

          {eligible && eligible !== false && (
            <button
              type="button"
              onClick={downloadCertificate}
              className="px-4 py-2 rounded-md bg-slate-800 text-white font-medium hover:opacity-90"
            >
              Download Certificate
            </button>
          )}
        </div>

        {/* result message */}
        <div>
          {eligible === null && (
            <div className="text-sm text-slate-500">Enter name and choose event, then click Check Eligibility.</div>
          )}

          {eligible === false && (
            <div className="text-sm text-rose-600">Not found — the participant does not appear in this event's records.</div>
          )}

          {eligible && eligible !== false && (
            <div className="text-sm text-emerald-600">
              Participant found ({eligible.source}{eligible.group ? ` — ${eligible.group}` : ""}). You can
              download the certificate.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
