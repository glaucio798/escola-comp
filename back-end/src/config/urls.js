//Centraliza as urls do front-end, que varia dependendo do ambiente em que o servidor está rodando

var urls;

switch (process.env.NODE_ENV) {
  case 'production': //No servidor de produção
    urls = {
      frontUrl: 'https://www.compjunior.com.br',
      backUrl: 'https://www.compjunior.com.br/api',
    };
    break;
  case 'development': //No servidor de testes
    urls = {
      frontUrl: 'https://squad.compjunior.com.br',
      backUrl: 'https://squad.compjunior.com.br/api',
    };
    break;
  default:
    //No computador local
    urls = {
      frontUrl: 'http://localhost:8080',
      backUrl: 'http://localhost:3000',
    };
    break;
}

//Note que a url para /uploads é diferente nos servidores, pois o servidor tem um redirecionamento.
//Onde deveria ser /api/uploads, é redirecionado para apenas /uploads

export default urls;
