import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Results() {
  const [events, setEvents] = useState([]);
  const { eventId } = useParams();

  // map common event slugs/aliases to internal ids or "all"
  const aliasMap = {
    "codewars-stage1": "all",
    "codewars-stage1-all": "all",
    "stage1": "all",
  };
  const resolvedId = eventId ? (aliasMap[eventId] ?? eventId) : null;

  // Sort + Rank Logic (marks desc → alphabetical A→Z)
  const sortAndRank = (students) => {
    const sorted = [...students].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    return sorted.map((s, idx) => ({
      ...s,
      rank: idx + 1,
    }));
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
        event: "CodeVastra Stage 1 — 1st Year Results",
        date: "1st Year",
        pdfUrl: "https://drive.google.com/file/d/1SKbuZBlW4x3Ah9sZT1XwiS6Hlr-yX7hA/view?usp=sharing",
        students: firstYear,
      },
      {
        id: "2nd-year",
        event: "CodeVastra Stage 1 — 2nd Year Results",
        date: "2nd Year",
        pdfUrl: "https://drive.google.com/file/d/1dfSR5QcTn03_0DzT9Jidl4OqD4lQ3qoK/view?usp=sharing",
        students: secondYear,
      },
      {
        id: "3rd-year",
        event: "CodeVastra Stage 1 — 3rd Year Results",
        date: "3rd Year",
        pdfUrl: "https://drive.google.com/file/d/1eworNNFRHdR2oSGHU3lOug8KtVM653j8/view?usp=sharing",
        students: thirdYear,
      },
    ]);
  }, []);

  // debug logging inside React (safe)
  useEffect(() => {
    console.log("DEBUG — current eventId:", eventId, "resolvedId:", resolvedId);
    console.log("DEBUG — events state length:", events.length);
  }, [eventId, resolvedId, events.length]);

  const focusedEvent = events.length && resolvedId && resolvedId !== "all"
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

  // If user visited /results/:eventId
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Event Results</h2>
              <p className="mt-1 text-sm text-slate-600">All Year-wise Results</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {events.map((ev) => renderEventBlock(ev))}
          </div>
        </div>
      );
    }

    if (!focusedEvent) {
      return (
        <div className="min-h-screen p-6">
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
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Event Results</h2>
            <p className="mt-1 text-sm text-slate-600">Selected result</p>
          </div>
        </div>

        <div className="mt-6">{renderEventBlock(focusedEvent)}</div>
      </div>
    );
  }

  // default: show all year-wise result tables
  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Event Results</h2>
          <p className="mt-1 text-sm text-slate-600">All Year-wise Results</p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {events.map((ev) => renderEventBlock(ev))}
      </div>
    </div>
  );
}
