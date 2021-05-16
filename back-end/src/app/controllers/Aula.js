import { Router } from 'express';
import AulaSchema from '@/app/schemas/Aula';
import { isValidObjectId } from 'mongoose'; //ignorem essa importação de início
import AuthMiddleware from '@/app/middlewares/Auth';

const Aula = new Router();

Aula.put('/:id', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;
  const { nome, link } = req.body;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  AulaSchema.findByIdAndUpdate(id, { nome, link })
    .then((resultado) => {
      if (resultado) return res.send(resultado);
      //Retorna o resultado antes da mudança, apesar de ter modificado
      else return res.status(404).send({ erro: 'Objeto não encontrado' });

      //Quando algum método de find do mongoose vai para o then, significa que o processo de busca deu certo,
      //mas não significa que foi encontrado, por isso é necessário o if e else
    })
    .catch((err) => {
      console.error(err, 'Erro ao editar o objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

export default Aula;
