import wretch from 'wretch'
import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import './Auth.css'

const FormItem = Form.Item

class AddMeals extends Component {
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.addMeals} className='login-form'>
        <FormItem label='BreakFast: '>
          {getFieldDecorator('breakfast', {
            rules: [
              { required: true, message: 'Please input your Breakfast!' }
            ]
          })(<Input placeholder='Breakfast' />)}
        </FormItem>
        <FormItem label='Lunch: '>
          {getFieldDecorator('lunch', {
            rules: [{ required: true, message: 'Please input your Lunch!' }]
          })(<Input placeholder='Lunch' />)}
        </FormItem>
        <FormItem label='Dinner: '>
          {getFieldDecorator('dinner', {
            rules: [{ required: true, message: 'Please input your Dinner!' }]
          })(<Input placeholder='Dinner' />)}
        </FormItem>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          SubmitMeal
        </Button>
      </Form>
    )
  }
  addMeals = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) console.error(err)
      wretch('http://localhost:5000/meals')
        .json(values)
        .post()
        .json(res => {
          console.log(res)
        })
    })
  }
}
export default Form.create()(AddMeals)
