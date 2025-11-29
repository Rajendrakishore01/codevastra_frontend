import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";

import Gallery from "./pages/Gallery";  
import Results from "./pages/Results";
import Footer from "./components/Footer";
import SelectedStudents from "./pages/SelectedStudents";
import Certificate from "./pages/Certificate";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 pb-16 pt-6" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          
           <Route path="/results" element={<Results />} />
<Route path="/results/:eventId" element={<Results />} />  
          {/* REQUIRED ROUTE */}
          <Route path="/gallery/:id" element={<Gallery />} />
          <Route path="/selected/:eventId" element={<SelectedStudents />} />
<Route path="/selected" element={<SelectedStudents />} />
<Route path="/certificate" element={<Certificate />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
