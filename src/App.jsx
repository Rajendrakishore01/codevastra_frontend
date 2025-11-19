import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";   // <-- ADD THIS

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pb-16 pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/admin" element={<Admin />} />

          {/* REQUIRED ROUTE */}
          <Route path="/gallery/:id" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}
