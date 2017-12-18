// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'

import { basename } from 'config'
import configureStore from 'store/configure'
import api from 'services/api'
import App from 'components/App'

const { persistor, store } = configureStore({}, { api: api.create() })

const renderApp = () => (
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
    >
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)


const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App')
    render(renderApp(), root)
  })
}
