import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Results from "./pages/Results";
import Footer from "./components/Footer";
import SelectedStudents from "./pages/SelectedStudents";
import Certificate from "./pages/Certificate";
import { motion, AnimatePresence } from "framer-motion";
import Cursor from "./components/Cursor";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#d6d6d6] text-black overflow-x-hidden">

      {/*  Navbar */}
      <Navbar />
      <Cursor />

      {/*  Animated Page Container */}
      <div className="max-w-7xl mx-auto px-4 pb-16 pt-6">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/team" element={<Team />} />

              <Route path="/results" element={<Results />} />
              <Route path="/results/:eventId" element={<Results />} />

              <Route path="/gallery/:id" element={<Gallery />} />

              <Route path="/selected/:eventId" element={<SelectedStudents />} />
              <Route path="/selected" element={<SelectedStudents />} />

              <Route path="/certificate" element={<Certificate />} />
              
            </Routes>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}