import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import CardContainer from '../common/CardContainer'
import Axios from 'axios'
import { dispoTimeOffRequests } from '../../actions'
import { connect } from 'react-redux'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
const baseURL = process.env.REACT_APP_SERVER_URL
class TimeOff extends Component {
  //sets the correct button on the DOM depending on the status of the request
  handleTimeOff = e => {
    e.preventDefault()
    const id = e.target.id
    let response = ''
    let name = e.target.name
    if (name === 'deny') {
      response = 'denied'
    } else {
      response = 'confirmed'
    }
    //calls function from redux actions
    this.props.dispoTimeOffRequests(id, response)
  }

  render() {
    const { timeOffRequests } = this.props

    return (
      <CardContainer>
        {/* Employee's Time Off */}
        {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
        When it's on the employees directory page, it should show pending PTO */}
        <p>Requested Time Off</p>
        {timeOffRequests &&
          timeOffRequests.map(({ id, date, status }) => (
            <React.Fragment key={id}>
              <p>{`${date} ${status}`}</p>
              {status === 'confirmed' ? (
                <button id={id} name="deny" onClick={this.handleTimeOff}>
                  deny
                </button>
              ) : 'pending' ? (
                <>
                  <button id={id} name="deny" onClick={this.handleTimeOff}>
                    deny
                  </button>
                  <button id={id} name="approve" onClick={this.handleTimeOff}>
                    approve
                  </button>
                </>
              )}{ status === 'denied' ? (
                <button id={id} name="approve" onClick={this.handleTimeOff}>
                  approve
                </button>
              ) : null}
            </React.Fragment>
          ))}
      </CardContainer>
    )
  }
}

export default connect(
  null,
  { dispoTimeOffRequests }
)(TimeOff)

TimeOff.propTypes = {
  // adding propTypes here
}
