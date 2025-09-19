import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URI } from '../utils/mongouri.js';
import Todo from '../model/todoSchema.js';   

mongoose.connect(MONGO_URI).then(() => console.log('Congrats Rehan MongoDB connected'));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/todos', async (req, res) => res.json(await Todo.find()));
app.get("/" , (req, res) => res.send("Congrats Rehan API is running..."));
app.post('/api/todos', async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
});
app.get('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) return res.status(404).json({ error: 'Not found' })
  res.json(todo)
})
app.put('/api/todos/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: 'deleted' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
export default app;