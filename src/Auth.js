import React from 'react'
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

const Auth = p => (
  <div className='auth--root'>
    <Tabs
      onChange={route => {
        p.history.push('/auth' + route)
      }}
      className='auth--tabs'
      type='card'
    >
      <TabPane key='/' tab='Sign In'><Routes /></TabPane>
      <TabPane key='/new' tab='Sign Up'><Routes /></TabPane>
    </Tabs>
  </div>
)

export default Auth
