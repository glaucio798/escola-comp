import { Router } from 'express';
import bcrypt from 'bcryptjs';
import authConfig from '@/config/auth';
import jwt from 'jsonwebtoken';
import User from '@/app/schemas/Usuario';

const router = new Router();

const generateToken = (params) => {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
};

router.post('/login', (request, response) => {
  const { email, password } = request.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              const token = generateToken({ uid: 'user.id' });
              return response.send({ token: token, tokenExpiration: '1d' });
            } else {
              return response.status(400).send({ error: 'Senha inválida' });
            }
          })
          .catch((error) => {
            console.error('Erro ao verificar senha');
            return response
              .status(500)
              .send({ error: 'Internal server error' });
          });
      } else {
        return response.status(404).send({ error: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('Erro ao logar');
      return response.status(500).send({ error: 'Erro interno' });
    });
});

export default router;
