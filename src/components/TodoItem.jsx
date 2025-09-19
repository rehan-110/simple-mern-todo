import { motion } from 'framer-motion'
import { FiEdit2, FiTrash2, FiCheck, FiCircle } from 'react-icons/fi'

export default function TodoItem({ todo, onDelete, onEdit, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -60, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative mb-4 overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-md ring-1 ring-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between p-5 gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(todo._id, { ...todo, done: !todo.done })}
            className={`cursor-pointer grid h-7 w-7 place-items-center rounded-full border-2 transition shrink-0 ${
              todo.done
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-gray-300 bg-white hover:border-emerald-400'
            }`}
          >
            {todo.done ? <FiCheck className="h-4 w-4" /> : <FiCircle className="h-4 w-4 text-gray-400" />}
          </motion.button>

          <p
            className={`text-lg font-medium tracking-tight break-words leading-relaxed ${
              todo.done ? 'line-through text-gray-400' : 'text-gray-800'
            } transition`}
          >
            {todo.text}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(todo._id)}
            className="cursor-pointer grid h-9 w-9 place-items-center rounded-full text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <FiEdit2 className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(todo._id)}
            className="cursor-pointer grid h-9 w-9 place-items-center rounded-full text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <FiTrash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <div className="h-1 bg-gray-100">
        <div
          className={`h-full ${todo.done ? 'bg-emerald-500' : 'bg-indigo-500'} transition-all duration-500`}
          style={{ width: todo.done ? '100%' : '0%' }}
        />
      </div>
    </motion.div>
  )
}