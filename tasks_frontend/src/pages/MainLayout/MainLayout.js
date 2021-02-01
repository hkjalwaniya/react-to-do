import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Route } from 'react-router-dom'
// eslint-disable-next-line
import clsx from 'clsx'
import styles from './styles'
import TasksAppBar from '../../components/organisms/TasksAppBar'

class MainLayout extends Component {
  render() {
    const { classes, children } = this.props
    return (
      <>
        <Grid
          container
          component="main"
          className={clsx(classes.root, classes.pageWrapper)}
        >
          <Grid item xs={12} className={classes.appBar}>
            <TasksAppBar />
          </Grid>
          <Route render={() => children} />
        </Grid>
      </>
    )
  }
}

export default withStyles(styles)(MainLayout)
