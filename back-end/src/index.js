import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './app/controllers/index';
import frontUrl from './config/urls';

const app = express();
app.disable('x-powered-by');

const port = process.env.NODE_ENV === 'production' ? 5000 : 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: frontUrl,
  }),
);

app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando no link http://localhost:${port}`);
});
