import wretch from 'wretch'
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Button } from 'antd'

class Meals extends Component {
  componentDidMount () {
    this.props.db
      .get('token')
      .then(token =>
        wretch('http://localhost:5000/meals')
          .auth(`Bearer ${token}`)
          .get()
          .json()
      )
      .then(data => console.log(data))
      .catch(() => this.props.history.push('/auth'))
  }
  render () {
    return (
      <div>
        <Button
          type='primary'
          onClick={() =>
            this.props.db
              .del('token')
              .then(() => this.props.history.push('/auth'))}
        >
          LogOut
        </Button>
      </div>
    )
  }
}
export default inject('db')(Meals)
