

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* MAIN CONTENT */}
      <main className="flex-grow space-y-10 max-w-6xl mx-auto px-4 pb-16 pt-6">
        <h2 className="text-3xl font-bold text-center">Our Team</h2>

        <div className="grid sm:grid-cols-3 gap-8">
          <Card title="President" name="Tanuj Pratap Singh" />
          <Card title="Vice President" name="Vansh Malik" />
          <Card
            title="Members"
            name="Rajendra Kishore, Khushi Singh, Samarth, Pradeep, Pravesh, Sneha, Khushi, Kumkum, Anshi, Aman, Happy Singh, Shiv Raghav"
          />
        </div>
      </main>

      
    </div>
  );
}

function Card({ title, name }) {
  return (
    <div
      className="w-full bg-white p-8 rounded-2xl shadow-md border border-slate-200 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
    >
    

      {/* Title */}
      <div className="mt-5 text-sm uppercase tracking-wider text-slate-500 font-semibold">
        {title}
      </div>

      {/* Names */}
      <div className="mt-3 font-semibold text-slate-900 text-base leading-relaxed">
        {name}
      </div>
    </div>
  );
}
