import mongoose from '@/database';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  //verificar necessidade de nome para criar usuário
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetTokenExpiration: {
    type: Date,
    select: false,
  },
});

UserSchema.pre('save', function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => {
      console.error('Erro hashing password', error);
    });
});

const Users = mongoose.model('Users', UserSchema);

export default Users;

// User padrão, fase de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  Users.findOne({ email: 'testeadmin@compjunior.com.br' })
    .then((res) => {
      if (!res) {
        Users.create({
          email: 'testeadmin@compjunior.com.br',
          password: '12345678',
        }).catch(console.error);
      }
    })
    .catch(console.error);
}
