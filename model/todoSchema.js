import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
});

export default mongoose.model('Todo', todoSchema);