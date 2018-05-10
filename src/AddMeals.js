import wretch from 'wretch'
import capitalize from 'lodash.capitalize'
import { inject } from 'mobx-react'
import React, { Component } from 'react'
import { Form, Input, Button, Icon } from 'antd'

import Meals from './Meals'

const FormItem = p => (
  <Form.Item
    label={capitalize(p.label)}
    {...{
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }}
  >
    {p.decorator(p.label, {
      rules: [{ required: p.required || false, message: p.message }]
    })(<Input placeholder={capitalize(p.label)} />)}
  </Form.Item>
)

class AddMeals extends Component {
  state = {
    loading: <Icon type='loading' />
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Meals
        selectedKey='/add-meals'
        style={{
          background: '#fff',
          padding: 24,
          margin: 24
        }}
        {...this.props}
      >
        {this.state.loading ||
          <Form onSubmit={this.addMeals} layout='horizontal'>
            <FormItem
              label='breakfast'
              decorator={getFieldDecorator.bind(this)}
              required
              message='Please input your Breakfast!'
            />
            <FormItem
              label='lunch'
              decorator={getFieldDecorator.bind(this)}
              required
              message='Please input your Lunch!'
            />
            <FormItem
              label='dinner'
              decorator={getFieldDecorator.bind(this)}
              required
              message='Please input your Dinner!'
            />
            <Form.Item
              {...{
                wrapperCol: { span: 14, offset: 4 }
              }}
            >
              <Button type='primary' htmlType='submit'>
                <Icon type='plus' />Add Meal
              </Button>
            </Form.Item>
          </Form>}
      </Meals>
    )
  }

  addMeals = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) console.error(err)
      wretch('http://localhost:5000/meals').json(values).post().json(res => {
        console.log(res)
      })
    })
  }

  componentDidMount () {
    this.props.db
      .get('token')
      .then(token =>
        wretch('http://localhost:5000/admin')
          .auth(`Bearer ${token}`)
          .get()
          .json()
      )
      .then(({ admin }) => {
        if (admin) this.setState({ loading: false })
        else throw new Error('Not authorized')
      })
      .catch(() => this.props.history.push('/auth'))
  }
}

export default inject('db')(Form.create()(AddMeals))
