import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const selectedData = {
  "codewars-stage2": {
    event: "CodeWars — Stage 2",
    date: "Dec 2025",
    groups: {
      "Group 1": [
        { name: "Mohd Arsh", year: "3rd Year" },
        { name: "Richa Sharma", year: "1st Year" },
        { name: "Ashutosh Singh", year: "2nd Year" },
        { name: "Aaradhya sharma", year: "3rd Year" },
      ],
      "Group 2": [
        { name: "Gurkirat Singh", year: "3rd Year" },
        { name: "Aryan Tyagi", year: "2nd Year" },
        { name: "Rashmibala", year: "1st Year" },
        { name: "Anshika rastogi", year: "1st Year" },
      ],
      "Group 3": [
        { name: "Yadvendra Kumar Yadav", year: "2nd Year" },
        { name: "chirag sharma", year: "1st Year" },
        { name: "shahzeb khan", year: "1st Year" },
        { name: "Lavish Nagar", year: "3rd Year" },
      ],
      "Group 4": [
        { name: "Rishu Parihar", year: "3rd Year" },
        { name: "Aashish kumar", year: "2nd Year" },
        { name: "AKSHITA SONI", year: "1st Year" },
        { name: "Tanu Tyagi", year: "1st Year" },
      ],
      "Group 5": [
        { name: "Mohit", year: "1st Year" },
        { name: "Abhishek Sharma", year: "3rd Year" },
        { name: "Abhinav singh", year: "2nd Year" },
        { name: "Mohd Mueen", year: "1st Year" },
      ],
      "Group 6": [
        { name: "Rishi Kumar Prajapati", year: "1st Year" },
        { name: "Swastik Halder", year: "1st Year" },
        { name: "Shivam Dubey", year: "2nd Year" },
        { name: "saumya singh", year: "3rd Year" },
      ],
    },
  },
};

export default function SelectedStudents() {
  const { eventId } = useParams();
  const [eventsFromStorage, setEventsFromStorage] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("codevastra_results") || "[]");
    setEventsFromStorage(stored);
  }, []);

  const getEventRecord = (id) => {
    if (!id) return null;
    const fromStorage = eventsFromStorage.find((e) => e.id === id);

    if (fromStorage) {
      if (fromStorage.groups) return fromStorage;
      if (fromStorage.selectedByYear) return fromStorage;

      if (Array.isArray(fromStorage.selected) || Array.isArray(fromStorage.selectedStudents)) {
        const raw = fromStorage.selected || fromStorage.selectedStudents;
        return {
          event: fromStorage.event || id,
          date: fromStorage.date || "",
          groups: {
            Selected: raw.map((s) => ({ name: s.name, year: s.year || s.batch || "-" })),
          },
        };
      }

      if (Array.isArray(fromStorage.students)) {
        const grouped = {};
        fromStorage.students.forEach((s) => {
          const label = s.year || s.batch || "Selected";
          if (!grouped[label]) grouped[label] = [];
          grouped[label].push({ name: s.name, year: label });
        });
        return {
          event: fromStorage.event || id,
          date: fromStorage.date || "",
          groups: grouped,
        };
      }

      return { event: fromStorage.event || id, date: fromStorage.date || "", groups: {} };
    }

    return selectedData[id] || null;
  };

  const record = eventId ? getEventRecord(eventId) : null;

  const availableEvents = (() => {
    const fromStorageList = eventsFromStorage.map((e) => ({ id: e.id, label: e.event || e.id }));
    const fallbackList = Object.keys(selectedData).map((k) => ({ id: k, label: selectedData[k].event || k }));
    const ids = new Set();
    const merged = [];
    [...fromStorageList, ...fallbackList].forEach((x) => {
      if (!ids.has(x.id)) {
        ids.add(x.id);
        merged.push(x);
      }
    });
    return merged;
  })();

  // Mobile row card used when screen is small
  const MobileRow = ({ index, student }) => (
    <div className="p-3 border-b border-slate-200 flex items-start justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-sm font-medium w-6 flex-shrink-0">{index + 1}</div>
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">{student.name}</div>
          <div className="text-xs text-slate-500 truncate">{student.year}</div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <span className="inline-block text-xs px-2 py-1 rounded-full border border-slate-200 text-slate-700 whitespace-nowrap">
          {student.year}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdf6]">
      <main className="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {record ? `Selected Students — ${record.event}` : "Selected Students"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {record ? "" : "Choose an event to view selected students"}
            </p>
          </div>

          {!record && <div className="text-sm text-slate-500">Found {availableEvents.length} events</div>}
        </div>

        {/* NO EVENT SELECTED */}
        {!record && (
          <div className="grid gap-4">
            {availableEvents.map((ev) => (
              <Link
                key={ev.id}
                to={`/selected/${ev.id}`}
                className="p-4 rounded-lg border bg-white hover:shadow-md transition flex items-center justify-between"
              >
                <div className="font-semibold text-slate-900">{ev.label}</div>
                <div className="text-sm text-orange-600">View selected →</div>
              </Link>
            ))}
          </div>
        )}

        {/* EVENT SELECTED */}
        {record && (
          <div className="mt-6 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">{record.date}</div>
                <div className="mt-2 text-sm text-slate-600">Groups: {Object.keys(record.groups || {}).length}</div>
              </div>

              <div className="flex items-center gap-3">
                <Link to={`/gallery/${eventId}`} className="text-sm text-orange-600 hover:underline">
                  View photos →
                </Link>
                <Link to={`/results/${eventId}`} className="text-sm text-blue-600 hover:underline">
                  View result →
                </Link>
              </div>
            </div>

            {/* GROUP LISTS */}
            {Object.entries(record.groups || {}).map(([groupName, students]) => {
              const list = Array.isArray(students) ? students : [];
              return (
                <section key={groupName} className="bg-white rounded-xl shadow-sm overflow-hidden border">
                  {/* header */}
                  <div className="px-4 py-3 border-b bg-slate-50 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{groupName}</h3>
                    <div className="text-sm text-slate-500">{list.length} members</div>
                  </div>

                  {/* TABLE for md and up */}
                  <div className="overflow-x-auto hidden md:block">
                    <table className="w-full table-fixed border-collapse">
                      <thead className="bg-white text-sm">
                        <tr>
                          <th className="p-3 text-left border border-slate-200 w-20">S.No</th>
                          <th className="p-3 text-left border border-slate-200">Name</th>
                          <th className="p-3 text-left border border-slate-200 w-48">Year</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((s, i) => (
                          <tr key={i} className="odd:bg-white even:bg-slate-50">
                            <td className="p-3 border border-slate-200 align-top">{i + 1}</td>
                            <td className="p-3 border border-slate-200 align-top">{s.name}</td>
                            <td className="p-3 border border-slate-200 align-top">{s.year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE: stacked rows */}
                  <div className="md:hidden">
                    {list.map((s, i) => (
                      <MobileRow key={i} index={i} student={s} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
