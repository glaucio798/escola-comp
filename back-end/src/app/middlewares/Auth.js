import jwt from 'jsonwebtoken';
import authConfig from '@/config/auth';

export default () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .send({ erro: 'É obrigatório o token de autenticação' });
    }
    const token = authHeader.split(' ')[1];

    if (
      !authHeader ||
      authHeader.search('Bearer') == -1 ||
      token === undefined ||
      token.trim() == ''
    ) {
      return res
        .status(401)
        .send({ erro: 'É obrigatório o token de autenticação' });
    }
    jwt.verify(token, authConfig.secret, (erro) => {
      if (erro) {
        return res.status(401).send({ erro: 'Token de autenticação inválido' });
      } else {
        return next();
      }
    });
  };
};
