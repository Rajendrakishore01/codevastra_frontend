import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-3 py-1 rounded-full text-sm ${
      pathname === path
        ? "bg-orange-500 text-white"
        : "text-slate-700 hover:bg-orange-100"
    }`;

  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center text-white font-bold">
            IIMT
          </div>
          <div>
            <div className="font-bold text-lg">CodeVastra</div>
            <div className="text-xs text-slate-500">
              Weaving Logic into Innovation
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/events" className={linkClass("/events")}>
            Events
          </Link>
          <Link to="/team" className={linkClass("/team")}>
            Team
          </Link>
          
        </div>
      </div>
    </nav>
  );
}
