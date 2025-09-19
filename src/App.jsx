import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi'
import Loader from './components/Loader'
import Dashboard from './components/Dashboard'
import TodoItem from './components/TodoItem'
import EditPage from './components/EditPage'

export const API = 'https://simple-mern-todo-two.vercel.app/api/todos'

export default function App() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)

  const loadTodos = async () => {
    const { data } = await axios.get(API)
    setTodos(data)
    setLoading(false)
  }

  useEffect(() => { loadTodos() }, [])

  const addTodo = async () => {
    const trimmed = text.trim()
    if (!trimmed) return toast.warn('Todo cannot be empty')
    const { data } = await axios.post(API, { text: trimmed, done: false })
    setTodos([...todos, data])
    setText('')
    toast.success('Added')
  }

  const updateTodo = async (id, body) => {
    const { data } = await axios.put(`${API}/${id}`, body)
    setTodos(todos.map(t => (t._id === id ? data : t)))
  }
  const onSave = updateTodo 

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`)
    setTodos(todos.filter(t => t._id !== id))
    toast.info('Deleted')
  }

  const deleteAll = async () => {
    if (!window.confirm('Delete every todo?')) return
    await Promise.all(todos.map(t => axios.delete(`${API}/${t._id}`)))
    setTodos([])
    toast.warning('All cleared')
  }

  if (loading) return <Loader />
  if (editId) return <EditPage id={editId} back={() => setEditId(null)} onSave={updateTodo} />

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <ToastContainer position="top-center" theme="light" />

        <Routes>
          <Route
  path="/edit/:id"
  element={
    <EditPage
      back={() => navigate(-1)}
      onSave={onSave}        // now defined
    />
  }
/>
          <Route
            path="/"
            element={
              <>
                <Dashboard todos={todos} deleteAll={deleteAll} />

                
<div className="mt-10 mb-7 flex gap-3">
  <input
    value={text}
    onChange={e => setText(e.target.value)}
    onKeyDown={e => e.key === 'Enter' && addTodo()}
    placeholder="Add a new task…"
    className="flex-1 rounded-2xl bg-white/80 px-5 py-3 text-gray-800 placeholder-gray-400
               shadow-inner ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-indigo-400
               backdrop-blur-md transition"
  />
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={addTodo}
    className="cursor-pointer grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500
               text-white shadow-lg hover:shadow-xl transition-shadow"
  >
    <FiPlus className="h-5 w-5" />
  </motion.button>
</div>


                <AnimatePresence>
                  {todos.map(t => (
                    <TodoItem
                      key={t._id}
                      todo={t}
                      onDelete={deleteTodo}
                      onEdit={() => navigate(`/edit/${t._id}`)}
                      onToggle={updateTodo}
                    />
                  ))}
                </AnimatePresence>
              </>
            }
          />
        </Routes>
      </div>
    </div>
  )
}