import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import wretch from 'wretch'
import './Meals.css'

const { Header, Sider, Content } = Layout

class Meals extends Component {
  state = {
    isAdmin: false
  }

  render () {
    return (
      <Layout className='meals--root'>
        <Header className='meals--header'>
          <span>Health Fix</span>
        </Header>
        <Layout>
          <Sider width={200} breakpoint='lg' collapsedWidth='0'>
            <Menu
              mode='inline'
              defaultSelectedKeys={[this.props.selectedKey || '/meals']}
              style={{ height: '100%', borderRight: 0 }}
              onSelect={({ key }) => this.props.history.push(`${key}`)}
            >
              <Menu.Item key='/'>Home</Menu.Item>
              <Menu.Item key='/meals'>Meals</Menu.Item>
              {this.state.isAdmin &&
                <Menu.Item key='/add-meals'>Add Meals</Menu.Item>}
              <Menu.Item key='/log-out'>Log out</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={this.props.style}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
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
      .then(({ admin }) => this.setState({ isAdmin: admin }))
      .catch(() => this.props.history.push('/auth'))
  }
}
export default Meals
