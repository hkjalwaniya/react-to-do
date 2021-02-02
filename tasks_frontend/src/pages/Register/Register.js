import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { userActions } from '../../actions'
import styles from './styles'
import CopyRight from '../../components/atoms/CopyRight'
import TasksTextField from '../../components/atoms/TasksTextField'
import TasksButton from '../../components/atoms/TasksButton'
import TasksLogo from '../../components/atoms/TasksLogo'
import TasksSnackBar from '../../components/atoms/TasksSnackBar'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      formSubmitted: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      firstname,
      lastname,
      username,
      email,
      password
    } = this.state
    const { dispatch } = this.props
    if (firstname && lastname && username && email && password) {
      this.setState({ formSubmitted: true })
      dispatch(
        userActions.register(
          firstname,
          lastname,
          username,
          email,
          password
        )
      )
    }
  }

  handleSnackBarClose = () => {
    this.setState({ formSubmitted: false })
  }

  render() {
    const { classes, error } = this.props
    const { formSubmitted } = this.state
    return (
      <Grid container component="main" className={classes.root}>
        {
          formSubmitted && error && error.message &&
          <TasksSnackBar
            isOpen={formSubmitted}
            handleSnackBarClose={this.handleSnackBarClose}
            severity="error"
            message={error.message}
          />
        }
        { formSubmitted && Object.keys(error).length < 1 &&
          <TasksSnackBar
            isOpen={formSubmitted}
            handleSnackBarClose={this.handleSnackBarClose}
            severity="success"
            message={error.message}
          />
        }
        <TasksSnackBar
          isOpen={formSubmitted}
          handleSnackBarClose={this.handleSnackBarClose}
          severity="success"
          message="Registered Successfully, Please verify your email address to continue!!!"
        />
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <TasksLogo />
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TasksTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="first-name"
                label="First Name"
                name="firstname"
                autoComplete="first-name"
                autoFocus
                onChange={this.handleChange}
              />
              <TasksTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="last-name"
                label="Last Name"
                name="lastname"
                autoComplete="last-name"
                onChange={this.handleChange}
              />
              <TasksTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user-name"
                label="User Name"
                name="username"
                autoComplete="user-name"
                onChange={this.handleChange}
              />
              <TasksTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
              />
              <TasksTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <TasksButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                btnName="Register"
              />
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    &lsquo; Already have an account? Sign In&lsquo;
                  </Link>
                </Grid>
              </Grid>
              <CopyRight variant="body2" color="textSecondary" align="center" />
            </form>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, error } = state.user
  return {
    loggedIn,
    error
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Register))
