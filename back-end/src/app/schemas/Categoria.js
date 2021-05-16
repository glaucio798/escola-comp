import mongoose from '@/database';

const Categoria = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  playlists: {
    type: Array,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Categoria', Categoria);
