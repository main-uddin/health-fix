import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Tabs } from 'antd'
import SignUp from './SignUp'
import SignIn from './SignIn'
import './Auth.css'

const Routes = p => (
  <Switch>
    <Route path='/auth/' exact component={SignIn} />
    <Route path='/auth/new' component={SignUp} />
  </Switch>
)

const { TabPane } = Tabs
class Auth extends Component {
  render () {
    return (
      <div className='auth--root'>
        <Tabs
          onChange={route => {
            this.props.history.push('/auth' + route)
          }}
          className='auth--tabs'
          type='card'
        >
          <TabPane key='/' tab='Sign In'><Routes /></TabPane>
          <TabPane key='/new' tab='Sign Up'><Routes /></TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Auth
