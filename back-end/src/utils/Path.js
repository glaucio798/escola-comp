const pathFile =
  process.NODE_ENV == 'production'
    ? '/api/arquivo/'
    : 'http://localhost:3333/arquivo/';

export { pathFile };
