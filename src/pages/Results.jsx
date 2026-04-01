import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

export default function Results() {
  const [events, setEvents] = useState([]);
  const { eventId } = useParams();

  // alias map
  const aliasMap = {
    "codewars-stage1": "all",
    "codewars-stage1-all": "all",
    stage1: "all",
  };
  const resolvedId = eventId ? aliasMap[eventId] ?? eventId : null;

  // sort + rank
  const sortAndRank = (students) => {
    const sorted = [...students].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    return sorted.map((s, idx) => ({ ...s, rank: idx + 1 }));
  };

  useEffect(() => {
    // ---------- 1st YEAR ----------
    const firstYear = sortAndRank([
      { name: "Richa Sharma", score: 35 },
      { name: "Rashmibala", score: 29 },
      { name: "Tanu Tyagi", score: 28 },
      { name: "chirag sharma", score: 28 },
      { name: "shahzeb khan", score: 28 },
      { name: "AKSHITA SONI", score: 26 },
      { name: "Mohit", score: 26 },
      { name: "Swastik Halder", score: 25 },
      { name: "Rishi Kumar Prajapati", score: 25 },
      { name: "Mohd Mueen", score: 25 },
      { name: "Anshika rastogi", score: 25 },
      { name: "Arjun Singh Mevati", score: 24 },
      { name: "priyanshu verma", score: 23 },
      { name: "Sajal Taliyan", score: 20 },
      { name: "Palak tyagi", score: 20 },
      { name: "Sharad kumar", score: 20 },
      { name: "VINKAL SAINI", score: 19 },
      { name: "Shubham Tomer", score: 19 },
      { name: "sneha", score: 19 },
      { name: "AQDAS HASHMI", score: 18 },
      { name: "ritik dhama", score: 18 },
      { name: "triveni", score: 17 },
      { name: "muskan gupta", score: 17 },
      { name: "Tanishq gupta", score: 14 },
      { name: "Akshansh kumar", score: 14 },
      { name: "ayush tyagi", score: 13 },
      { name: "vimal kumar", score: 11 },
      { name: "nirbhay singh chadda", score: 10 },
      { name: "manish kumar", score: 7 },
    ]);

    // ---------- 2nd YEAR ----------
    const secondYear = sortAndRank([
      { name: "Shivam Dubey", score: 25 },
      { name: "Parikshit", score: 12 },
      { name: "Deepanshu", score: 23 },
      { name: "Mohd yasir", score: 24 },
      { name: "Aryan Tyagi", score: 32 },
      { name: "zaid siddiqui", score: 23 },
      { name: "Manas yadav", score: 16 },
      { name: "vishal upadhyay", score: 12 },
      { name: "shiva sharma", score: 22 },
      { name: "Aayushi", score: 16 },
      { name: "Aashish kumar", score: 26 },
      { name: "Akshay pal", score: 20 },
      { name: "Adrika Singh", score: 21 },
      { name: "Ashutosh Singh", score: 33 },
      { name: "Jayant Pal", score: 20 },
      { name: "Gungun Srivastava", score: 24 },
      { name: "Akshay Pundir", score: 24 },
      { name: "Abhinav singh", score: 29 },
      { name: "ASHEESH YADAV", score: 21 },
      { name: "aditi rai", score: 22 },
      { name: "vaibhav pal", score: 20 },
      { name: "Yadvendra Kumar Yadav", score: 29 },
    ]);

    // ---------- 3rd YEAR ----------
    const thirdYear = sortAndRank([
      { name: "Mohd Arsh", score: 37 },
      { name: "Gurkirat Singh", score: 32 },
      { name: "Abhishek Sharma", score: 26 },
      { name: "Lavish Nagar", score: 26 },
      { name: "Digvijay Singh", score: 20 },
      { name: "saumya singh", score: 26 },
      { name: "Aaradhya sharma", score: 28 },
      { name: "Arsalaan Mansoori", score: 22 },
      { name: "Rishu Parihar", score: 32 },
    ]);

    setEvents([
      {
        id: "1st-year",
        event: "Codewars Stage 1 — 1st Year Results",
        date: "1st Year",
        pdfUrl:
          "https://drive.google.com/file/d/1SKbuZBlW4x3Ah9sZT1XwiS6Hlr-yX7hA/view?usp=sharing",
        students: firstYear,
      },
      {
        id: "2nd-year",
        event: "Codewars Stage 1 — 2nd Year Results",
        date: "2nd Year",
        pdfUrl:
          "https://drive.google.com/file/d/1dfSR5QcTn03_0DzT9Jidl4OqD4lQ3qoK/view?usp=sharing",
        students: secondYear,
      },
      {
        id: "3rd-year",
        event: "Codewars Stage 1 — 3rd Year Results",
        date: "3rd Year",
        pdfUrl:
          "https://drive.google.com/file/d/1eworNNFRHdR2oSGHU3lOug8KtVM653j8/view?usp=sharing",
        students: thirdYear,
      },
    ]);
  }, []);

  useEffect(() => {
    console.log("DEBUG — current eventId:", eventId, "resolvedId:", resolvedId);
    console.log("DEBUG — events state length:", events.length);
  }, [eventId, resolvedId, events.length]);

  const focusedEvent =
    events.length && resolvedId && resolvedId !== "all"
      ? events.find((e) => e.id === resolvedId)
      : null;

  const availableIds = events.map((e) => e.id);

  const renderEventBlock = (ev) => (
    <div key={ev.id} className="rounded-xl border p-4 bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">{ev.event}</h3>
          <p className="text-sm text-slate-500">{ev.date}</p>
          {ev.pdfUrl && (
            <p className="text-xs text-slate-400 mt-1">
              <a href={ev.pdfUrl} target="_blank" rel="noreferrer" className="underline">
                View source PDF
              </a>
            </p>
          )}
        </div>

        <div className="text-right text-sm">
          <div className="text-xs text-slate-500">Total students</div>
          <div className="font-semibold">{ev.students.length}</div>
        </div>
      </div>

      <div className="mt-4 overflow-auto">
        {ev.students.length > 0 ? (
          <table className="w-full border">
            <thead className="bg-slate-100 text-sm">
              <tr>
                <th className="border p-2">Rank</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {ev.students.map((s, i) => (
                <tr key={i}>
                  <td className="border p-2 text-center">{s.rank}</td>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-slate-600">
            <div className="text-lg font-semibold">No students</div>
          </div>
        )}
      </div>
    </div>
  );

  // ----------------- Certificate modal logic -----------------
  const [certOpen, setCertOpen] = useState(false);
  const [certName, setCertName] = useState("");
  const [certYear, setCertYear] = useState("");
  const [certEventId, setCertEventId] = useState("");
  const [certMatch, setCertMatch] = useState(null);
  const [certChecking, setCertChecking] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // default event select
    if (focusedEvent) setCertEventId(focusedEvent.id);
    else if (events.length) setCertEventId(events[0].id);
  }, [focusedEvent, events]);

  useEffect(() => {
    // auto-focus name input when modal opens
    if (certOpen) {
      // small timeout to ensure element exists
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 50);
    }
  }, [certOpen]);

  const findStudentAcrossEvents = (name, year, eventIdToCheck) => {
    if (!name) return null;
    const t = name.trim().toLowerCase();
    const checkList = eventIdToCheck ? events.filter((e) => e.id === eventIdToCheck) : events;
    for (const ev of checkList) {
      for (const s of ev.students || []) {
        if (s.name && s.name.trim().toLowerCase() === t) {
          if (year) {
            const yrLower = year.trim().toLowerCase();
            const evYear = (ev.date || "").toLowerCase();
            if (!evYear.includes(yrLower) && !((s.year || "").toLowerCase().includes(yrLower))) {
              continue;
            }
          }
          return { event: ev, student: s };
        }
      }
    }
    return null;
  };

  const handleCertCheck = (e) => {
    e?.preventDefault();
    setCertChecking(true);
    setCertMatch(null);
    const match = findStudentAcrossEvents(certName, certYear, certEventId || null);
    if (match) setCertMatch(match);
    else setCertMatch(false);
    setCertChecking(false);
  };

  // helper to pick display event name: prefer "CodeWars" for codewars events
  const getDisplayEventName = (ev) => {
    if (!ev) return "";
    const id = ev.id || "";
    const title = (ev.event || "").toLowerCase();
    if (id.toLowerCase().includes("codewars") || title.includes("codewars") || title.includes("stage")) {
      return "CodeWars";
    }
    return ev.event || ev.id || "";
  };
const downloadCertificate = (match) => {
  const nameText = match.student.name;
  const ev = match.event;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const W = 1600;
  const H = 1100;
  canvas.width = W;
  canvas.height = H;

  // ===== BACKGROUND =====
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(0, 0, W, H);

  // ===== BORDER =====
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, W - 100, H - 100);

  // ===== LOAD IMAGES =====
  const iimtLogo = new Image();
  const clubLogo = new Image();
  const sign = new Image();

  iimtLogo.src = "/iimt-logo.png";       
  clubLogo.src = "/codevastra-logo.png"; 
  sign.src = "/saurabh-sign.png";       

  iimtLogo.onload = () => {
    clubLogo.onload = () => {
      sign.onload = () => {

        // ===== LOGOS =====
        ctx.drawImage(iimtLogo, 100, 80, 120, 120);
        ctx.drawImage(clubLogo, W - 220, 80, 120, 120);

        // ===== HEADER =====
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = "bold 50px Georgia";
        ctx.fillText("IIMT Engineering College", W / 2, 130);

        ctx.font = "22px Georgia";
        ctx.fillStyle = "#555";
        ctx.fillText("Meerut, Uttar Pradesh, India", W / 2, 170);

        // ===== TITLE =====
        ctx.fillStyle = "#000";
        ctx.font = "bold 60px Georgia";
        ctx.fillText("Certificate", W / 2, 300);

        ctx.font = "28px Georgia";
        ctx.fillText("of Participation", W / 2, 340);

        // ===== LINE =====
        ctx.beginPath();
        ctx.moveTo(350, 370);
        ctx.lineTo(W - 350, 370);
        ctx.strokeStyle = "#d4af37";
        ctx.stroke();

        // ===== BODY =====
        ctx.fillStyle = "#444";
        ctx.font = "24px Georgia";
        ctx.fillText("This is to certify that", W / 2, 450);

        // ===== NAME =====
        ctx.fillStyle = "#000";
        ctx.font = "bold 70px Georgia";
        ctx.fillText(nameText, W / 2, 540);

        // ===== EVENT =====
        ctx.fillStyle = "#444";
        ctx.font = "24px Georgia";
        ctx.fillText("has successfully participated in", W / 2, 600);

        ctx.fillStyle = "#b45309";
        ctx.font = "bold 30px Georgia";
        ctx.fillText("CodeWars Coding Competition", W / 2, 650);

      ctx.font = "20px Georgia";
  ctx.fillStyle = "#000";

  ctx.textAlign = "left";
  ctx.fillText(`Year: ${ev.date}`, 120, 780);

  ctx.textAlign = "right";
  ctx.fillText(`Date:18 Nov 2025`, W - 120, 780);

        // ===== SIGNATURE =====
        ctx.textAlign = "center";

        // signature image
        ctx.drawImage(sign, 300, 830, 180, 80);

        ctx.beginPath();
        ctx.moveTo(300, 900);
        ctx.lineTo(500, 900);
        ctx.stroke();

        ctx.fillText("Saurabh Gupta", 400, 940);
        ctx.fillText("Faculty Coordinator", 400, 970);

        

        // ===== DOWNLOAD =====
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${nameText.replace(/\s+/g, "_")}_certificate.png`;
          a.click();
          URL.revokeObjectURL(url);
        });
      };
    };
  };
};
 
  // ----------------- rendering -----------------
  if (eventId) {
    if (events.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-xl font-semibold">Loading results…</div>
            <div className="mt-2 text-sm text-slate-500">Please wait while results are loaded.</div>
          </div>
        </div>
      );
    }

    if (resolvedId === "all") {
      return (
        <div className="min-h-screen flex flex-col p-4">
          <HeaderWithCert />
          <div className="mt-6 space-y-6">{events.map((ev) => renderEventBlock(ev))}</div>
          {certOpen && CertModal()}
        </div>
      );
    }

    if (!focusedEvent) {
      return (
        <div className="min-h-screen p-6">
          <HeaderWithCert />
          <div className="mt-6 rounded-lg border p-6 bg-white">
            <div className="mt-4 text-sm">
              <div className="text-slate-500"> click to open:</div>
              <ul className="mt-2 list-disc ml-6">
                {availableIds.map((id) => (
                  <li key={id}>
                    <Link to={`/results/${id}`} className="underline">
                      {id}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {certOpen && CertModal()}
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col p-4">
        <HeaderWithCert />
        <div className="mt-6">{renderEventBlock(focusedEvent)}</div>
        {certOpen && CertModal()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      <HeaderWithCert />
      <div className="mt-6 space-y-6">{events.map((ev) => renderEventBlock(ev))}</div>
      {certOpen && CertModal()}
    </div>
  );

  // header component (keeps layout same)
  function HeaderWithCert() {
    return (
      <div className="flex items-center justify-between relative">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Event Results</h2>
          <p className="mt-1 text-sm text-slate-600">All Year-wise Results</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setCertOpen(true);
              setCertMatch(null);
            }}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            Generate Certificate
          </button>
        </div>
      </div>
    );
  }

  // certificate modal (rendered near end of page to avoid reflow issues)
  function CertModal() {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => {
            setCertOpen(false);
            setCertMatch(null);
          }}
        />
        <div className="relative w-full max-w-lg bg-white rounded-xl border shadow-lg p-6 z-60">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">Generate Certificate</h3>
            <button
              onClick={() => {
                setCertOpen(false);
                setCertMatch(null);
              }}
              className="text-sm text-slate-500"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleCertCheck} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm text-slate-700">Participant name</label>
              <input
                ref={nameInputRef}
                value={certName}
                onChange={(e) => setCertName(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="Full name"
                autoComplete="off"
              />
            </div>

          

            <div>
              <label className="block text-sm text-slate-700">Event (optional)</label>
              <select
                value={certEventId}
                onChange={(e) => setCertEventId(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2"
              >
                <option value="">Any event</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.event || ev.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-slate-800 text-white"
                disabled={certChecking || !certName}
              >
                {certChecking ? "Checking..." : "Check"}
              </button>

              {certMatch && certMatch !== false && (
                <button
                  type="button"
                  onClick={() => downloadCertificate(certMatch)}
                  className="px-3 py-2 rounded-md bg-emerald-600 text-white"
                >
                  Download Certificate
                </button>
              )}

              <button
                type="button"
                className="px-3 py-2 rounded-md bg-slate-100"
                onClick={() => {
                  setCertOpen(false);
                  setCertMatch(null);
                }}
              >
                Cancel
              </button>
            </div>

            <div>
              {certMatch === null && <div className="text-sm text-slate-500">Enter details and click Check.</div>}
              {certMatch === false && <div className="text-sm text-rose-600">Not found — participant not in records.</div>}
              {certMatch && certMatch !== false && (
                <div className="text-sm text-emerald-600">
                  Found in <strong>{certMatch.event.event}</strong> — "{certMatch.student.name}".
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
