
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { API } from '../App'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from './Loader'

export default function EditPage({ back, onSave }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await axios.get(`${API}/${id}`)
      setText(data.text)
      setDone(data.done)
      setLoading(false)
    }
    load()
  }, [id])

  const save = async () => {
    const trimmed = text.trim()
    if (!trimmed) return toast.warn('Todo cannot be empty')
    await onSave(id, { text: trimmed, done })
    navigate('/')
    toast.success('Updated')
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl ring-1 ring-black/5"
      >
        <div className="h-2 bg-gradient-to-r from-indigo-400 to-emerald-400" />

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-3xl font-extrabold text-transparent">
              Edit Task
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={back}
              className="cursor-pointer grid h-10 w-10 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              <FiX className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">Task</label>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full rounded-xl border-0 bg-gray-100 px-4 py-3 text-gray-800 placeholder-gray-400
                         ring-1 ring-transparent focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            />
          </div>

          <div className="mb-6 flex items-center gap-3">
            <input
              id="done"
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
              className="cursor-pointer h-5 w-5 rounded border-gray-300 text-indigo-500
                         focus:ring-2 focus:ring-indigo-400"
            />
            <label htmlFor="done" className="cursor-pointer select-none font-medium text-gray-700">
              Mark as completed
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={save}
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500
                       px-6 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <FiCheck className="h-5 w-5" />
            Save Changes
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
