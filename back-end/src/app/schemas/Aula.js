import mongoose from '@/database';

const Aula = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Aula', Aula);
