import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from './Auth'
import Meals from './Meals'

import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/meals' component={Meals} />
        </Switch>
      </Router>
    )
  }
}

export default App
