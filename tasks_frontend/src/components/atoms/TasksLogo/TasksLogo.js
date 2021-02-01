import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import SignatureLogo from '../../../assets/images/signature-logo.jpg'

class TasksLogo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return (
      <>
        <Grid item xs={2} sm={2} md={2} component={Paper} elevation={6} square>
          <img className={classes.img} alt="complex" src={SignatureLogo} />
        </Grid>
      </>
    )
  }
}

export default withStyles(styles)(TasksLogo)
