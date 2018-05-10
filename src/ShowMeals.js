import wretch from 'wretch'
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, List, Timeline } from 'antd'

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
    this.props.db
      .get('token')
      .then(token =>
        wretch('http://localhost:5000/meals')
          .auth(`Bearer ${token}`)
          .get()
          .json()
      )
      .then(data => {
        this.setState(p => ({
          loading: false,
          mealPlans: p.mealPlans.concat(data)
        }))
      })
      .catch(() => this.props.history.push('/auth'))
  }

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
export default inject('db')(ShowMeals)
