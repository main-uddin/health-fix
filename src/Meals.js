import wretch from 'wretch'
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, Button } from 'antd'

import './Meals.css'

class Meals extends Component {
  state = {
    loading: true
  }

  render () {
    return (
      <div className='meals--root'>
        {this.state.loading
          ? <Icon type='loading' />
          : <Button type='primary' onClick={this.removeToken}>LogOut</Button>}
      </div>
    )
  }

  componentDidMount () {
    this.props.db
      .get('token')
      .then(token =>
        wretch('http://localhost:5000/meals')
          .auth(`Bearer ${token}`)
          .get()
          .json()
      )
      .then(data => {
        this.setState({ loading: false })
        console.log(data)
      })
      .catch(() => this.props.history.push('/auth'))
  }

  removeToken = e =>
    this.props.db.del('token').then(() => this.props.history.push('/auth'))
}
export default inject('db')(Meals)
