import mongoose from '@/database';

const Playlist = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  aulas: {
    type: Array,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Playlist', Playlist);
