import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

import ProfilePhoto from '../../assets/images/photo.JPG'
import styles from './styles'
import TasksButton from '../../components/atoms/TasksButton'

class Profile extends Component {
  render() {
    const {  classes } = this.props
    return (
      <Grid container className={classes.profileWrapper}>
        {/* <Grid container> */}
          <Grid item xs={12} md={12} container spacing={3}>
            <Grid item xs={12} md={6} className={classes.profilePictureWrapper}>
              <Card className={classes.root}>
                <CardHeader
                  className={classes.media}
                  avatar={
                    <Avatar
                      alt="profile picture"
                      src={ProfilePhoto}
                      variant="square"
                      className={classes.profileImage}
                    />
                  }
                />
                <CardActions>
                  <TasksButton
                    type="button"
                    variant="contained"
                    color="primary"
                    className="submit"
                    size="small"
                    btnName="Update Photo"
                  />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} container direction="column">
              <Card>
                {/* <CardHeader title="Personal Information" /> */}
                <CardContent>
                  <Typography variant="h6" component="label" color="textSecondary">
                    First Name*
                  </Typography>
                  <Typography className={classes.pos}>
                    Hamendra
                  </Typography>
                  <Typography variant="h6" component="h2" color="textSecondary">
                    Last Name*
                  </Typography>
                  <Typography className={classes.pos}>
                    Bairwa
                  </Typography>
                </CardContent>
                <CardActions>
                  <TasksButton
                    type="button"
                    variant="contained"
                    color="primary"
                    className="submit"
                    size="small"
                    btnName="Update Profile"
                  />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        {/* </Grid> */}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.user
  return {
    user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
