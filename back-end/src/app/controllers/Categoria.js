import { Router } from 'express';
import CategoriaSchema from '@/app/schemas/Categoria';
import PlaylistSchema from '@/app/schemas/Playlist';
import { isValidObjectId } from 'mongoose'; //ignorem essa importação de início
import AuthMiddleware from '@/app/middlewares/Auth';

const Categoria = new Router();

Categoria.get('/', (req, res) => {
  CategoriaSchema.find()
    .then((resultado) => {
      return res.send(resultado);
    })
    .catch((err) => {
      console.error(err, 'Erro ao listar objetos');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

const addPlaylists = async (playlists, play) => {
  for (let i = 0; i < playlists.length; i++) {
    const event = await PlaylistSchema.findById(playlists[i]);
    if (event) play.push(event);
  }
  return;
};

Categoria.get('/:name', (req, res) => {
  const name = req.params.name;

  if (!name) return res.status(400).send({ erro: 'Name é obrigatório' });

  CategoriaSchema.findOne({ nome: new RegExp('^' + name + '$', 'i') })
    .then(async (resultadoCat) => {
      if (resultadoCat) {
        const { nome, playlists } = resultadoCat;

        var play = [];
        await addPlaylists(playlists, play);

        res.send({ nome, playlists: play });
      } else {
        console.error('Erro ao encontrar Categoria');
        return res.status(404).send({ erro: 'Categoria não encontrada' });
      }
    })
    .catch((err) => {
      console.error(err, 'Erro ao encontrar Categoria');
      return res.status(404).send({ erro: 'Categoria não encontrada' });
    });
});

Categoria.post('/', [AuthMiddleware()], (req, res) => {
  const { nome, playlists } = req.body;

  if (!nome) return res.status(400).send({ erro: 'Campo nome faltando' });
  if (!playlists)
    return res.status(400).send({ erro: 'Campo playlists faltando' });

  //Se chegar até aqui, significa que tá tudo certo
  CategoriaSchema.create({ nome, playlists })
    .then((resultado) => {
      return res.send(resultado);
    })
    .catch((err) => {
      console.error(err, 'Erro ao criar objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

Categoria.post('/:name/playlist', [AuthMiddleware()], (req, res) => {
  const name = req.params.name;

  if (!name) return res.status(400).send({ erro: 'name é obrigatório' });

  const { aulas, nome } = req.body;

  if (!nome) return res.status(400).send({ erro: 'Campo nome faltando' });
  if (!aulas) return res.status(400).send({ erro: 'Campo aulas faltando' });

  CategoriaSchema.findOne({ nome: new RegExp('^' + name + '$', 'i') })
    .then((resultadoCat) => {
      const nomeCat = resultadoCat.nome;
      const playlists = resultadoCat.playlists;

      PlaylistSchema.create({ nome, aulas })
        .then((resultadoPlay) => {
          playlists.push(resultadoPlay._id);

          CategoriaSchema.findByIdAndUpdate(resultadoCat._id, {
            nome: nomeCat,
            playlists,
          })
            .then((resUpdate) => {
              if (resUpdate)
                return res
                  .status(200)
                  .send({ message: 'Playlist criada com sucesso' });
              else
                return res.status(404).send({ erro: 'Objeto não encontrado' });
            })
            .catch((err) => {
              console.error(err, 'Erro ao atualizar Categoria');
              res.status(500).send({ erro: 'Erro ao atualizar Categoria' });
            });
        })
        .catch((err) => {
          console.error(err, 'Erro ao criar playlist');
          res.status(500).send({ erro: 'Erro ao criar playlist' });
        });
    })
    .catch((err) => {
      console.error(err, 'Erro ao encontrar Categoria');
      return res.status(404).send({ erro: 'Categoria não encontrada' });
    });
});

Categoria.put('/:id', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;
  const { nome, aulas } = req.body;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  CategoriaSchema.findByIdAndUpdate(id, { nome, aulas })
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

Categoria.delete('/:id', [AuthMiddleware()], (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  CategoriaSchema.findByIdAndRemove(id)
    .then((resultado) => {
      if (resultado) {
        for (var playlist in resultado.playlists) {
          PlaylistSchema.findByIdAndRemove(resultado.playlists[playlist]).catch(
            (err) => {
              console.error(err, 'Erro ao deletar playlist');
            },
          );
        }
        return res.send(resultado);
      } else return res.status(404).send({ erro: 'Objeto não encontrado' });
    })
    .catch((err) => {
      console.error(err, 'Erro ao remover objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

export default Categoria;
