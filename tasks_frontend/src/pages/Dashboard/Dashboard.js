import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

class Dashboard extends Component {
  render() {
    const { user, classes } = this.props
    return (
      <>
        <section className={classes.dashboardWrapper}>
          <h1>
            Hello {user.firstName} {user.lastName}, Welcome to dashboard!!
          </h1>
        </section>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.user
  return {
    user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
