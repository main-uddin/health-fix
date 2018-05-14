import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, List, Timeline } from 'antd'

import api from './api'
import Meals from './Meals'
import SubButton from './SubscribeButton'
import './ShowMeals.css'

class ShowMeals extends Component {
  state = {
    loading: <Icon type='loading' />,
    mealPlans: [],
    buttonContent: true
  }

  render () {
    return (
      <Meals
        selectedKey='/meals'
        style={{
          background: '#fff',
          padding: 24,
          margin: 24
        }}
        {...this.props}
      >
        {this.state.loading ||
          <List
            itemLayout='horizontal'
            dataSource={this.state.mealPlans}
            renderItem={(item, ind) => (
              <List.Item className='meal--item'>
                <Timeline>
                  {Array.from(Object.entries(item), ([time, meal], idx) => {
                    if (time === 'subscribed') return ''
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
          />}
      </Meals>
    )
  }

  componentDidMount () {
    this.props.db.get('token').then(token =>
      api
        .url('/meals')
        .auth(`Bearer ${token}`)
        .get()
        .error(404, res =>
          this.setState({ loading: <div>No Meals Available!</div> })
        )
        .error(401, res => {
          this.props.history.push('/auth')
        })
        .json(data => {
          this.setState(p => ({
            loading: false,
            mealPlans: p.mealPlans.concat(data)
          }))
        })
    )
  }

  toggleSub = idx => subd => {
    this.props.db
      .get('token')
      .then(token =>
        api
          .url(`/meals/${idx}`)
          .auth(`Bearer ${token}`)[subd ? 'delete' : 'put']()
          .json()
      )
      .then(res => console.log(res))
  }
}
export default inject('db')(ShowMeals)
