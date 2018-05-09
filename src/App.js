import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from './Auth'
import Home from './Home'
import Meals from './Meals'
import AddMeals from './AddMeals'

import './App.css'

const LogOut = p => {
  p.db.del('token').then(() => p.history.push('/auth'))
  return <span> bye bye </span>
}

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' component={Auth} />
          <Route path='/meals' component={Meals} />
          <Route path='/add-meals' component={AddMeals} />
          <Route path='/log-out' component={inject('db')(LogOut)} />
        </Switch>
      </Router>
    )
  }
}

export default App
