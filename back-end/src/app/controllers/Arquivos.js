import { Router } from 'express';
import Multer from '../middlewares/Multer';
import ArquivoSchema from '../schemas/Arquivo';
import { isValidObjectId } from 'mongoose'; //ignorem essa importação de início
import DeletePhoto from '../../utils/DeletePhoto';
import fs from 'fs';
import path from 'path';
import { pathFile } from '../../utils/Path';
import AuthMiddleware from '@/app/middlewares/Auth';

const Arquivo = new Router();

Arquivo.get('/', (req, res) => {
  ArquivoSchema.find()
    .then((resultado) => {
      const arquivos = resultado.map((item) => {
        return {
          _id: item._id,
          nome: item.nome,
          arquivo: pathFile + item.arquivo,
        };
      });
      return res.send(arquivos);
    })
    .catch((err) => {
      console.error(err, 'Erro ao listar objetos');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

Arquivo.get('/:filename', (req, res) => {
  var filePath = path.resolve(`uploads/arquivos/${req.params.filename}`);

  fs.exists(filePath, (exists) => {
    if (exists) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).send({
        erro: 'Arquivo não encontrado',
      });
    }
  });
});

Arquivo.post('/', [AuthMiddleware(), Multer.single('arquivo')], (req, res) => {
  const { nome } = req.body;

  if (!nome) return res.status(400).send({ erro: 'Campo nome faltando' });
  if (!req.file)
    return res.status(400).send({ erro: 'Campo arquivo faltando' });

  const arquivo = req.file.path.split('\\');

  ArquivoSchema.create({ nome, arquivo: arquivo[arquivo.length - 1] })
    .then((resultado) => {
      return res.send(resultado);
    })
    .catch((err) => {
      DeletePhoto(req.file.path);
      console.error(err, 'Erro ao criar objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

Arquivo.delete('/:id', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  ArquivoSchema.findByIdAndRemove(id)
    .then((resultado) => {
      if (resultado) {
        DeletePhoto(resultado.arquivo);
        return res.send(resultado);
      } else return res.status(404).send({ erro: 'Objeto não encontrado' });
    })
    .catch((err) => {
      console.error(err, 'Erro ao remover objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

export default Arquivo;
