import { Router } from 'express';
import PlaylistSchema from '@/app/schemas/Playlist';
import AulaSchema from '@/app/schemas/Aula';
import { isValidObjectId } from 'mongoose'; //ignorem essa importação de início
import AuthMiddleware from '@/app/middlewares/Auth';

const Playlist = new Router();

const addAulas = async (Aulas, play) => {
  for (let i = 0; i < Aulas.length; i++) {
    const event = await AulaSchema.findById(Aulas[i]);
    if (event) play.push(event);
    else play.push(Aulas[i]);
  }
  return;
};

Playlist.get('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  PlaylistSchema.findById(id)
    .then(async (resultado) => {
      if (resultado) {
        const { aulas, nome } = resultado;

        var aulasTradado = [];

        await addAulas(aulas, aulasTradado);

        return res.send({ nome, aulas: aulasTradado });
      } else return res.status(404).send({ erro: 'Playlist não encontrada' });
    })
    .catch((err) => {
      console.error(err, 'Erro ao listar objetos');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

Playlist.post('/:id/aula', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  const { link, nome } = req.body;

  if (!nome) return res.status(400).send({ erro: 'Campo nome faltando' });
  if (!link) return res.status(400).send({ erro: 'Campo link faltando' });

  PlaylistSchema.findById(id)
    .then((resultadoPlay) => {
      const nomePlay = resultadoPlay.nome;
      const aulas = resultadoPlay.aulas;

      AulaSchema.create({ nome, link })
        .then((resultadoAula) => {
          aulas.push(resultadoAula.id);

          PlaylistSchema.findByIdAndUpdate(id, { nome: nomePlay, aulas })
            .then((resUpdate) => {
              if (resUpdate)
                return res
                  .status(200)
                  .send({ message: 'Aula criada com sucesso' });
              else
                return res.status(404).send({ erro: 'Objeto não encontrado' });
            })
            .catch((err) => {
              console.error(err, 'Erro ao atualizar playlist');
              res.status(500).send({ erro: 'Erro ao atualizar playlist' });
            });
        })
        .catch((err) => {
          console.error(err, 'Erro ao criar aula');
          res.status(500).send({ erro: 'Erro ao criar aula' });
        });
    })
    .catch((err) => {
      console.error(err, 'Erro ao encontrar playlist');
      return res.status(404).send({ erro: 'Playlist não encontrada' });
    });
});

Playlist.delete('/:id/aula/:aulaId', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  const aulaId = req.params.aulaId;

  if (!aulaId) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(aulaId))
    return res.status(400).send({ erro: 'ID inválido' });

  PlaylistSchema.findById(id)
    .then((resultadoPlay) => {
      const nomePlay = resultadoPlay.nome;
      const aulas = resultadoPlay.aulas;

      AulaSchema.findByIdAndRemove(aulaId)
        .then((resultadoAula) => {
          const index = aulas.indexOf(aulaId);
          if (index > -1) {
            aulas.splice(index, 1);
          }

          PlaylistSchema.findByIdAndUpdate(id, { nome: nomePlay, aulas })
            .then((resUpdate) => {
              if (resUpdate)
                return res.status(200).send({
                  message: 'Aula deletada com sucesso',
                });
              else
                return res.status(404).send({ erro: 'Objeto não encontrado' });
            })
            .catch((err) => {
              console.error(err, 'Erro ao atualizar playlist');
              res.status(500).send({ erro: 'Erro ao atualizar playlist' });
            });
        })
        .catch((err) => {
          console.error(err, 'Erro ao deletar aula');
          res.status(500).send({ erro: 'Erro ao deletar aula' });
        });
    })
    .catch((err) => {
      console.error(err, 'Erro ao encontrar playlist');
      return res.status(404).send({ erro: 'Playlist não encontrada' });
    });
});

Playlist.put('/:id', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;
  const { nome, aulas } = req.body;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  PlaylistSchema.findByIdAndUpdate(id, { nome, aulas })
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

Playlist.delete('/:id', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  PlaylistSchema.findByIdAndRemove(id)
    .then((resultado) => {
      if (resultado) {
        for (var aula in resultado.aulas) {
          AulaSchema.findByIdAndRemove(resultado.aulas[aula]).catch((err) => {
            console.error(err, 'Erro ao deletar aula');
          });
        }
        return res.send(resultado);
      } else return res.status(404).send({ erro: 'Objeto não encontrado' });
    })
    .catch((err) => {
      console.error(err, 'Erro ao remover objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

export default Playlist;
