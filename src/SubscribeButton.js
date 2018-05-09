import React, { Component } from 'react'
import { Button } from 'antd'

class SubscribeButton extends Component {
  state = {
    subscribed: this.props.subscribed || false
  }

  render () {
    return (
      <Button
        onClick={this.handleClick}
        type={this.state.subscribed ? 'danger' : 'primary'}
      >
        {(this.state.subscribed ? 'Un-' : '') + 'Subscribe'}
      </Button>
    )
  }

  handleClick = e => {
    this.setState(p => {
      const next = { subscribed: !p.subscribed }
      this.props.onToggleSub(p.subscribed)
      return next
    })
  }
}
export default SubscribeButton
