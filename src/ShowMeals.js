import * as R from 'ramda'
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, List, Timeline } from 'antd'

import api from './api'
import Meals from './Meals'
import SubButton from './SubscribeButton'
import './ShowMeals.css'

const mealWeight = {
  breakfast: 0,
  lunch: 1,
  dinner: 2
}

const sortMealTimes = R.compose(
  R.sortBy(([k, v]) => mealWeight[k]),
  R.toPairs,
  R.pickAll(R.keys(mealWeight))
)

const toTimelineItem = ([time, meal]) => (
  <Timeline.Item
    dot={<Icon type='clock-circle-o' />}
    key={Date.now() + Math.random()}
  >
    <b>{time.toUpperCase()}: </b>{meal}
  </Timeline.Item>
)

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
              <List.Item className='meal--item' key={ind}>
                <Timeline>
                  {R.compose(R.map(toTimelineItem), sortMealTimes)(item)}
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
