import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import db from './database'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider db={db}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
