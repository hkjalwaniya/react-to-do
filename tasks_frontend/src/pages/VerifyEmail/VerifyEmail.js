import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import tasksImage from '../../assets/images/tasks-image.jpg'
import TasksButton from '../../components/atoms/TasksButton'
import TasksSnackBar from '../../components/atoms/TasksSnackBar'

import styles from './styles'
import { userService } from '../../api'
import { history } from '../../helpers'

function VeirficationCardContent() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        Email Confirmation
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        you are almost ready to start on Tasks. Click below button to verify your email address.
      </Typography>
    </>
  )
}


class VerifyEmail extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEmailVerificationTried: false
    }
  }
  render() {
    const handleEmailVerification = async (e) => {
      e.preventDefault();
      const { match } = this.props;
      const { token } = match.params;
      if(token) {
        const response = await userService.verifyEmail(token)
        this.setState({ isEmailVerificationTried: true })
        if(response.success) {
          setTimeout(() => {
            history.push('/login')
          },2000)
        }
      }
    }
    const { classes } = this.props
    const { isEmailVerificationTried } = this.state
    return (
      <Grid container spacing={3} className={classes.mainContainer} >
        <TasksSnackBar
          isOpen={isEmailVerificationTried}
          handleSnackBarClose={() => true}
          severity="success"
          message="Email verified successfully, Please login to continue!!!"
        />
        <Grid item xs={12} md={12} lg={12}>
          <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={tasksImage}
                title="Tasks"
              />
              <CardContent>
                <VeirficationCardContent />
              </CardContent>
            <CardActions>
              <TasksButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleEmailVerification}
                btnName="Verify Email Address"
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(VerifyEmail)
