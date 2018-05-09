import wretch from 'wretch'
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, List, Timeline, Layout, Menu } from 'antd'

import SubButton from './SubscribeButton'
import './Meals.css'

const { Header, Sider, Content } = Layout

class Meals extends Component {
  state = {
    loading: true,
    dataArr: [],
    buttonContent: true
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
              defaultSelectedKeys={['/meals']}
              style={{ height: '100%', borderRight: 0 }}
              onSelect={({ key }) => this.props.history.push(`${key}`)}
            >
              <Menu.Item key='/'>Home</Menu.Item>
              <Menu.Item key='/meals'>Meals</Menu.Item>
              <Menu.Item key='/log-out'>Log out</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 24
              }}
            >
              <List
                itemLayout='horizontal'
                dataSource={this.state.dataArr}
                renderItem={(item, ind) => (
                  <List.Item className='meal--item'>
                    <Timeline>
                      {Array.from(Object.entries(item), ([time, meal], idx) => {
                        if (time === 'subscribed') return
                        return (
                          <Timeline.Item
                            dot={<Icon type='clock-circle-o' />}
                            key={idx}
                          >
                            <b>{time.toUpperCase()}: </b>{meal}
                          </Timeline.Item>
                        )
                      })}
                    </Timeline>
                    <SubButton
                      subscribed={item.subscribed}
                      onToggleSub={this.toggleSub(ind)}
                    />
                  </List.Item>
                )}
              />
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
        wretch('http://localhost:5000/meals')
          .auth(`Bearer ${token}`)
          .get()
          .json()
      )
      .then(data => {
        this.setState({
          loading: false,
          dataArr: this.state.dataArr.concat(data)
        })
        console.log('from database: ', data)
        console.log('from state:', this.state.dataArr)
      })
      .catch(() => this.props.history.push('/auth'))
  }

  removeToken = e =>
    this.props.db.del('token').then(() => this.props.history.push('/auth'))

  toggleSub = idx => subd => {
    this.props.db
      .get('token')
      .then(token =>
        wretch(`http://localhost:5000/meals/${idx}`)
          .auth(`Bearer ${token}`)[subd ? 'delete' : 'put']()
          .json()
      )
      .then(res => console.log(res))
  }
}
export default inject('db')(Meals)

// {this.state.loading
//   ? <Icon type='loading' />
//   : <Button type='primary' onClick={this.removeToken}>LogOut</Button>}
