import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '../views/App'

const appDataNode = document.querySelector('#APP_DATA')
const jsonData = appDataNode?.textContent
const appProperties = jsonData ? JSON.parse(jsonData) : null
const name = appProperties?.name

if(typeof name === 'string') {
    ReactDOM.hydrate(<App name={name}/>, document.querySelector('#root'))
} else {
    console.error('Application data is missing or not valid')
}
