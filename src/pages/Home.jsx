import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* HERO SECTION ONLY */}
      <section className="py-20 flex flex-col md:flex-row gap-14 items-center max-w-7xl mx-auto px-4 pb-16 pt-6">
        
        {/* LEFT SIDE */}
        <div className="flex-1 max-w-xl">
          {/* Small badge */}
          <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Official Coding Club · IIMT Engineering College
          </span>

          {/* Title */}
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
            Welcome to <span className="text-orange-600">CodeVastra</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg text-slate-600">
            The official coding club of IIMT Engineering College — empowering
            students through coding, logic and innovation. Join us in building
            and mastering real-world tech skills!
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link
              to="/events"
              className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-6 py-3 rounded-lg shadow-md font-semibold"
            >
              Explore Events
            </Link>

            <Link
              to="/team"
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
            >
              Meet the Team →
            </Link>
          </div>

          {/* Small stats */}
          <div className="mt-6 flex flex-wrap gap-8 text-sm text-slate-500">
           
            <div>
              <p className="font-semibold text-slate-900 text-lg">1+</p>
              <p>Events Conducted</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">∞</p>
              <p>Learning Opportunities</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE / ILLUSTRATION */}
        <div className="flex-1 flex justify-end">
          <div className="w-70 max-w-md">
            <img
              src="/club-hero.png"  
              alt="CodeVastra Coding Club"
              className="rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>

      </section>
      {/* ----------------- COPY-PASTE BELOW YOUR HERO (inside Home component) ----------------- */}

{/* ABOUT / WHAT IS A CODING CLUB */}
<section className="max-w-7xl mx-auto px-4 mt-12">
  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
    <div className="md:flex md:items-center md:gap-10">
      <div className="flex-1">
        <h2 className="text-3xl font-extrabold">What is a Coding Club?</h2>
        <p className="mt-4 text-slate-600 text-lg">
          A coding club is a student-run community where learners of all levels
          come together to practice programming, build projects, host workshops,
          and compete in events. At CodeVastra we focus on hands-on learning,
          peer mentorship, and real-world problem-solving.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: "#fff6f0", color: "#f36100", border: "1px solid #fee6da" }}>
            Hands-on Workshops
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-100">
            Project Teams
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-100">
            Competitions & Hackathons
          </span>
        </div>
      </div>

      
    </div>
  </div>
</section>

{/* WHAT WE DO / ACTIVITIES */}
<section className="max-w-7xl mx-auto px-4 mt-10">
  <h3 className="text-2xl font-bold">What We Do</h3>
  <p className="mt-2 text-slate-600">Practice · Build · Learn · Compete</p>

  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <div className="p-5 bg-white rounded-xl shadow-sm">
      <div className="text-3xl font-extrabold" style={{ color: "#f36100" }}></div>
      <h4 className="mt-3 font-semibold">Workshops</h4>
      <p className="mt-2 text-sm text-slate-600">Hands-on sessions on Web, DS & Algo, and Tools.</p>
    </div>

    <div className="p-5 bg-white rounded-xl shadow-sm">
      <div className="text-3xl font-extrabold" style={{ color: "#f36100" }}></div>
      <h4 className="mt-3 font-semibold">Projects</h4>
      <p className="mt-2 text-sm text-slate-600">Build real applications in small teams.</p>
    </div>

    <div className="p-5 bg-white rounded-xl shadow-sm">
      <div className="text-3xl font-extrabold" style={{ color: "#f36100" }}></div>
      <h4 className="mt-3 font-semibold">Contests</h4>
      <p className="mt-2 text-sm text-slate-600">Coding contests and hackathons to sharpen problem solving.</p>
    </div>

    <div className="p-5 bg-white rounded-xl shadow-sm">
      <div className="text-3xl font-extrabold" style={{ color: "#f36100" }}></div>
      <h4 className="mt-3 font-semibold">Mentorship</h4>
      <p className="mt-2 text-sm text-slate-600">Peer mentoring for placements, internships and open-source.</p>
    </div>
  </div>
</section>



{/* STATS */}
<section className="max-w-7xl mx-auto px-4 mt-10">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-lg text-center shadow-sm">
      <div className="text-2xl font-bold" style={{ color: "#f36100" }}>1+</div>
      <div className="mt-1 text-sm text-slate-600">Events Conducted</div>
    </div>
    <div className="bg-white p-6 rounded-lg text-center shadow-sm">
      <div className="text-2xl font-bold" style={{ color: "#f36100" }}>∞</div>
      <div className="mt-1 text-sm text-slate-600">Learning Opportunities</div>
    </div>
    <div className="bg-white p-6 rounded-lg text-center shadow-sm">
      <div className="text-2xl font-bold" style={{ color: "#f36100" }}>14+</div>
      <div className="mt-1 text-sm text-slate-600">Active Members</div>
    </div>
    <div className="bg-white p-6 rounded-lg text-center shadow-sm">
      <div className="text-2xl font-bold" style={{ color: "#f36100" }}>1+</div>
      <div className="mt-1 text-sm text-slate-600">Project</div>
    </div>
  </div>
</section>





      
      
      
    </>
  );
}
