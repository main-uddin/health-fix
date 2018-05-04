import wretch from 'wretch'
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item

class SignIn extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) console.error(err)
      wretch('http://localhost:5000/auth')
        .json(values)
        .post()
        .json()
        .then(({ token }) =>
          wretch('http://localhost:5000/data')
            .auth(`Bearer ${token}`)
            .get()
            .json()
        )
        .then(console.log)
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input prefix={<Icon type='user' />} placeholder='Username' />)}
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
          Log in
        </Button>
      </Form>
    )
  }
}

export default Form.create()(SignIn)
