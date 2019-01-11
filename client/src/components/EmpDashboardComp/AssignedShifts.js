import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'

const AssignedSifts = ({ user }) => {
  return (
    <Container>
      {user.map(item => {
        return (
          <div className="title" key={item.id}>
            <h5>Assigned Shifts</h5>
            <div />
            {item.assignedShift.map(assigned => {
              return (
                <div className="details" key={assigned.id}>
                  <div>
                    <p>{assigned.date}</p>
                  </div>
                  <div>
                    <p>{assigned.times}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </Container>
  )
}

export default AssignedSifts

AssignedSifts.propTypes = {
  // adding propTypes here
}

const Container = styled('div')`
  padding: ${system.spacing.bigPadding};
  border: 1px solid black;
  width: 100%;
  max-width: 216px;
  min-width: 200px;
  .title {
    width; 100%;
    max-width: 200px;
    h5 {
      font-size: ${system.fontSizing.ml};
    }
    .details {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      margin: 10px auto;
      p {
        font-size: ${system.fontSizing.m};
      }
    }
  }
`
