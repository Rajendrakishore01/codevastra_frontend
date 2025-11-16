import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="py-10 flex flex-col md:flex-row gap-10 items-center">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          CodeVastra — CodeWars
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Coding competition for C Programming & Web Development.
          Simple, clean and student–friendly.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/events"
            className="bg-orange-500 text-white px-5 py-3 rounded-lg shadow"
          >
            View Events & Register
          </Link>
          <Link
            to="/team"
            className="text-orange-600 font-semibold flex items-center"
          >
            Meet the team →
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-72 h-52 rounded-xl border  from-orange-50 to-white shadow-inner flex flex-col items-center justify-center">
          <div className="text-3xl font-bold"></div>
          <div className="text-sm text-slate-600">Registration Fee</div>
        </div>
      </div>
    </section>
  );
}
