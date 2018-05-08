import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import levelup from 'levelup'
import encoding from 'encoding-down'
import local from 'localstorage-down'
import registerServiceWorker from './registerServiceWorker'

const db = levelup(encoding(local('newdb'), { valueEncoding: 'json' }))

ReactDOM.render(
  <Provider db={db}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
