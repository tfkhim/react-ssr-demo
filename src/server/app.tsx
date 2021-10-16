import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { App } from '../views/App';

const app = express();
const port = 3000;

const getTemplate = (): Promise<string> => {
  const filePath = path.resolve('dist/client/index.html')
  return fs.promises.readFile(filePath, {encoding: 'utf-8'})
}

type Request = express.Request

type AppData = {
  name: string
}

const getInitialAppData = (req: Request): AppData => {
  const queryName = req.query.name
  const name = typeof queryName === 'string' ? queryName : 'World'
  return { name }
}

const renderApp = (appData: AppData): string => {
  return ReactDOMServer.renderToString(<App name={appData.name} />)
}

const formatTemplate = (template: string, appData: AppData): string => {
  const appDataJson = JSON.stringify(appData)
  const renderedApp = renderApp(appData)
  return template.replace('{{APP_DATA_PLACEHOLDER}}', appDataJson).replace('{{APP_PLACEHOLDER}}', renderedApp)
}

app.get('/', async (req, res) => {
  const appData = getInitialAppData(req)
  const template = await getTemplate()
  const responseContent = formatTemplate(template, appData)
  res.status(200).contentType('text/html').send(responseContent)
});

app.use('/static', express.static('dist/client/static'))

app.listen(port);
