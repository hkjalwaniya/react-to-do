import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { userActions } from '../../actions'
import styles from './styles'
import CopyRight from '../../components/atoms/CopyRight'
import TasksTextField from '../../components/atoms/TasksTextField'
import TasksButton from '../../components/atoms/TasksButton'
import TasksLogo from '../../components/atoms/TasksLogo'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const { dispatch } = this.props
    if (email && password) {
      dispatch(userActions.login(email, password))
    }
  }

  render() {
    const { loggedIn, classes } = this.props
    if (loggedIn) {
      return <Redirect to="/dashboard" />
    }
    return (
      <>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <TasksLogo />
              <Typography component="h1" variant="h5">
                Log In
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <TasksButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  btnName="Log In"
                />

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      &quot; Don&lsquo;t have an account? Sign Up&quot;
                    </Link>
                  </Grid>
                </Grid>
                <CopyRight
                  variant="body2"
                  color="textSecondary"
                  align="center"
                />
              </form>
            </div>
          </Grid>
        </Grid>
      </>
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

export default connect(mapStateToProps)(withStyles(styles)(Login))
