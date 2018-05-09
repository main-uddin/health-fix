import React, { Component } from 'react'
import { Layout, Button } from 'antd'

import './Home.css'

const { Header, Content } = Layout

class HomePage extends Component {
  render () {
    return (
      <Layout className='home--root'>
        <Header className='home--header'>
          <span>Health Fix</span>
          <Button
            shape='circle'
            icon='lock'
            onClick={e => {
              this.props.history.push('/auth')
            }}
          />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', margin: 24, padding: 24 }}>
            Content
          </div>
        </Content>
      </Layout>
    )
  }
}

export default HomePage
