import mongoose from '@/database';

const Arquivo = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  arquivo: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Arquivo', Arquivo);
