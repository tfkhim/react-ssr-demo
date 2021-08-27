import express from 'express';
import path from 'path'

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.sendFile(path.resolve('dist/client/index.html'))
});

app.use('/static', express.static('dist/client/static'))

app.listen(port);
