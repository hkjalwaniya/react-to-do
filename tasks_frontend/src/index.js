import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
