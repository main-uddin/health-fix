import wretch from 'wretch'
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './Auth.css'
const FormItem = Form.Item
class SignUp extends Component {
  handleSignUp = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) console.error(err)
      wretch('http://localhost:5000/auth')
        .json(values)
        .put()
        .json(res => {
          console.log(res)
        })
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSignUp} className='login-form'>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input prefix={<Icon type='user' />} placeholder='Username' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email!' }]
          })(<Input prefix={<Icon type='mail' />} placeholder='Email' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type='lock' />}
              type='password'
              placeholder='Password'
            />
          )}
        </FormItem>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          SignUp
        </Button>
      </Form>
    )
  }
}

export default Form.create()(SignUp)
