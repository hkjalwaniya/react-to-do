import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import tasksImage from '../../assets/images/tasks-image.jpg'
import TasksButton from '../../components/atoms/TasksButton'

// import Paper from '@material-ui/core/Paper';
// import TasksLogo from '../../components/atoms/TasksLogo';
// import clsx from 'clsx';

import styles from './styles'
import { userService } from '../../api'

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
  render() {
    const handleEmailVerification = async (e) => {
      e.preventDefault();
      const { match } = this.props;
      const { token } = match.params;
      console.log('token', token);
      if(token) {
        const response = await userService.verifyEmail(token)
        console.log('response',response);
      }
    }
    const { classes } = this.props
    return (
      <Grid container spacing={3} className={classes.mainContainer} >
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
