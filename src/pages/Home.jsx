import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO SECTION ONLY */}
      <section className="py-20 flex flex-col md:flex-row gap-14 items-center">
        
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
    </>
  );
}
