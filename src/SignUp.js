import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './Auth.css'
const FormItem = Form.Item
class SignUp extends Component {
  render () {
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          <Input prefix={<Icon type='user' />} placeholder='Name' />
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type='mail' />} placeholder='Email' />
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type='lock' />} placeholder='password' />
        </FormItem>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          SignUp
        </Button>
      </Form>
    )
  }
}

export default SignUp
