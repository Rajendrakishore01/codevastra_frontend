export default function Team() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Team</h2>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card title="President" name="Tanuj Pratap Singh" />
        <Card title="Vice President" name="Vansh Malik" />
        <Card
          title="Members"
          name="Rajendra Kishore, Khushi Singh, Samarth, Pradeep, Pravesh, Sneha, Khushi, Kumkum, Anshi, Aman, Happy Singh, Shiv Raghav"
        />
      </div>
    </section>
  );
}

function Card({ title, name }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-2 font-semibold text-sm">{name}</div>
    </div>
  );
}
