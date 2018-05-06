import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from './Auth'

import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/auth' component={Auth} />
        </Switch>
      </Router>
    )
  }
}

export default App
