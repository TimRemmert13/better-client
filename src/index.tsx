import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
)
