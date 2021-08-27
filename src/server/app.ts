import express from 'express';
import path from 'path'
import fs from 'fs'

const app = express();
const port = 3000;

const getTemplate = (): Promise<string> => {
  const filePath = path.resolve('dist/client/index.html')
  return fs.promises.readFile(filePath, {encoding: 'utf-8'})
}

type Request = express.Request

const getInitialAppData = (req: Request): object => {
  const name = req.query.name ?? 'World'
  return { name }
}

const formatTemplate = (template: string, appData: object): string => {
  const appDataJson = JSON.stringify(appData)
  return template.replace('{{APP_DATA_PLACEHOLDER}}', appDataJson)
}

app.get('/', async (req, res) => {
  const appData = getInitialAppData(req)
  const template = await getTemplate()
  const responseContent = formatTemplate(template, appData)
  res.status(200).contentType('text/html').send(responseContent)
});

app.use('/static', express.static('dist/client/static'))

app.listen(port);
