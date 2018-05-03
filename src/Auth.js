import React, { Component } from 'react'
import { Button } from 'antd'
import SignUp from './SignUp'
import SignIn from './SignIn'
import './Auth.css'
class Auth extends Component {
  state = {
    showIn: false,
    showUp: false
  }
  render () {
    return (
      <div>

        <Button
          onClick={() => {
            this.setState({
              showIn: true,
              showUp: false
            })
          }}
          type='primary'
          htmlType='submit'
        >
          SignIn
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          onClick={() => {
            this.setState({
              showIn: false,
              showUp: true
            })
          }}
        >
          SignUp
        </Button>

        {this.state.showIn && <SignIn />}
        {this.state.showUp && <SignUp />}
      </div>
    )
  }
}

export default Auth
