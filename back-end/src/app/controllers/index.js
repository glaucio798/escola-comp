import express from 'express';
import Playlist from './Playlist';
import Categoria from './Categoria';
import Aula from './Aula';
import Arquivo from './Arquivos';
import Autenticacao from './Autenticacao';

const router = express();
router.disable('x-powered-by');

router.use('/playlist', Playlist);
router.use('/categoria', Categoria);
router.use('/aula', Aula);
router.use('/arquivo', Arquivo);
router.use('/autenticacao', Autenticacao);

export default router;
