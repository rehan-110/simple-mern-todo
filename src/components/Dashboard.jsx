import { FiTrash, FiArchive, FiCheckCircle, FiCircle } from 'react-icons/fi'

export default function Dashboard({ todos, deleteAll }) {
  const all = todos.length
  const done = todos.filter(t => t.done).length
  const pending = all - done

  const Card = ({ label, value, icon, gradient }) => (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ${gradient}`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{label}</p>
          <p className="text-4xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  )

  return (
    <section className="mb-8">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800">Task Overview</h1>
        <button
          onClick={deleteAll}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-rose-600 transition"
        >
          <FiTrash className="inline" /> Delete All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Card
          label="All Tasks"
          value={all}
          icon={<FiArchive />}
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <Card
          label="Completed"
          value={done}
          icon={<FiCheckCircle />}
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <Card
          label="Pending"
          value={pending}
          icon={<FiCircle />}
          gradient="bg-gradient-to-br from-amber-500 to-amber-600"
        />
      </div>
    </section>
  )
}