import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/escola-comp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;

export default mongoose;
