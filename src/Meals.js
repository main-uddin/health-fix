import wretch from 'wretch'
import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import MdLocalRestaurant from 'react-icons/lib/md/local-restaurant'

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
              <Menu.Item key='/'><Icon type='home' />Home</Menu.Item>
              <Menu.Item key='/meals'>
                <Icon><MdLocalRestaurant /></Icon>Meals
              </Menu.Item>
              {this.state.isAdmin &&
                <Menu.Item key='/add-meals'>
                  <Icon type='plus' />Add Meals
                </Menu.Item>}
              <Menu.Item key='/log-out'>
                <Icon type='user-delete' />Log out
              </Menu.Item>
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
