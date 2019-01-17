import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ErrorMessage from './ErrorMessage'
import { authenticate } from '../actions'
import propTypes from 'prop-types'

// takes in a component and it's props and wraps in App.js as
// <PrivateRoute exact path="<routePath>" />

// time to display error message
const interval = 3000

class PrivateRoute extends React.Component {
  state = { timeout: false }

  render() {
    const { user, error, component: Component, access, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={ownProps => {
          // initialize authentication process if no user on redux state
          if (!user) {
            console.log('user false')
            // checks to see if auth was already unsuccessfully tried
            if (error) {
              console.log(error)
              // checks to see if an message has already been displayed
              if (this.state.timeout) {
                // if so, displays error message and starts timeout
                setTimeout(() => this.setState({ timeout: true }), interval)
                return <ErrorMessage error={error} />
              }
              // else, redirects to root
              return <Redirect to="/" />
            }

            // otherwise App is still going through auth process, but has not errored,
            // so show loading screen.
            return <p>Loading...</p>
          }

          // if user exists on state, then verify user authorization
          const { role } = user
          let hasPermission =
            (access === 'owner' && role === 'owner') ||
            (access === 'admin' &&
              (role === 'owner' || role === 'supervisor')) ||
            access === 'all'

          if (hasPermission) {
            return <Component {...ownProps} {...rest} />
          } else {
            return <Redirect to="/" />
          }
        }}
      />
    )
  }
}

PrivateRoute.propTypes = {
  // props types go here
}

const mapStateToProps = ({ auth: { user, error } }) => ({
  user,
  error
})

export default connect(
  mapStateToProps,
  { authenticate }
)(PrivateRoute)
