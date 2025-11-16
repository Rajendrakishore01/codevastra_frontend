// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://codevastra-backend.onrender.com";

// 🔐 Hardcoded password – yahan jo chaho password rakh lo
const ADMIN_PASSWORD = "rajendra@admin";

export default function Admin() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [pwdInput, setPwdInput] = useState("");
  const [pwdError, setPwdError] = useState("");

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // check if already logged in (localStorage)
  useEffect(() => {
    if (localStorage.getItem("cv_admin_ok") === "1") {
      setIsAuthed(true);
    }
  }, []);

  // jab authenticated ho tabhi data fetch karo
  useEffect(() => {
    if (!isAuthed) return;

    const fetchRegs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/registrations`);
        setData(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching registrations");
      } finally {
        setLoading(false);
      }
    };
    fetchRegs();
  }, [isAuthed]);

  // filter + search
  useEffect(() => {
    let list = [...data];
    if (statusFilter !== "all") {
      list = list.filter((r) => r.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          r.rollNumber.toLowerCase().includes(q) ||
          (r.eventName || "").toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [statusFilter, search, data]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pwdInput === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setPwdError("");
      localStorage.setItem("cv_admin_ok", "1");
    } else {
      setPwdError("Wrong password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cv_admin_ok");
    setIsAuthed(false);
    setPwdInput("");
  };

  // 1) Login screen
  if (!isAuthed) {
    return (
      <section className="flex justify-center items-center py-20">
        <div className="w-full max-w-sm bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-2">Admin Login</h2>
          <p className="text-xs text-slate-500 mb-4">
            Only CodeVastra core team ke liye.
          </p>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={pwdInput}
                onChange={(e) => setPwdInput(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {pwdError && (
                <div className="text-red-500 text-xs mt-1">{pwdError}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded text-sm font-semibold"
            >
              Login
            </button>
          </form>
          <p className="mt-3 text-[10px] text-slate-400">
            Note: Ye simple frontend lock hai. Production level security ke liye
            backend authentication use karo.
          </p>
        </div>
      </section>
    );
  }

  // 2) Authenticated view – registrations table
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Admin – Registrations</h2>
          <p className="text-xs text-slate-500">
            Sab students ki details, payment status, time, sab yahan show ho
            raha hai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="created">Only Created</option>
            <option value="failed">Failed</option>
          </select>
          <input
            placeholder="Search by name / roll / event"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-56"
          />
          <button
            onClick={handleLogout}
            className="text-xs px-2 py-1 border rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No registrations found.
        </div>
      ) : (
        <div className="overflow-auto rounded-lg border bg-white shadow-sm">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <Th>Time</Th>
                <Th>Event</Th>
                <Th>Name</Th>
                <Th>Roll</Th>
                <Th>College / Branch / Sec</Th>
                <Th>Email</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Payment ID</Th>
                <Th>Method / Bank</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-t hover:bg-slate-50">
                  <Td>
                    {new Date(r.createdAt).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </Td>
                  <Td>{r.eventName}</Td>
                  <Td>{r.fullName}</Td>
                  <Td>{r.rollNumber}</Td>
                  <Td>
                    <div>{r.collegeName}</div>
                    <div className="text-[10px] text-slate-500">
                      {r.branch} {r.section && `• ${r.section}`}
                    </div>
                  </Td>
                  <Td>{r.email}</Td>
                  <Td>₹{(r.amount || 0) / 100}</Td>
                  <Td>
                    <span
                      className={
                        r.status === "paid"
                          ? "px-2 py-1 rounded-full bg-green-100 text-green-700"
                          : r.status === "failed"
                          ? "px-2 py-1 rounded-full bg-red-100 text-red-700"
                          : "px-2 py-1 rounded-full bg-yellow-100 text-yellow-800"
                      }
                    >
                      {r.status}
                    </span>
                  </Td>
                  <Td className="max-w-[140px] break-words">
                    {r.paymentId || "-"}
                  </Td>
                  <Td className="max-w-[140px] break-words">
                    {r.paymentMethod || "-"}
                    {r.bank ? ` / ${r.bank}` : ""}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Th({ children }) {
  return (
    <th className="px-3 py-2 text-left font-semibold whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="px-3 py-2 align-top whitespace-nowrap">{children}</td>
  );
}
