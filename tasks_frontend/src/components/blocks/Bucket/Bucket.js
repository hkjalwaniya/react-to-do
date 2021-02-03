import React, { Component } from 'react'
import { withStyles, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import styles from './styles'
import Task from '../../atoms/Task'
import TasksButton from '../../atoms/TasksButton'

class Bucket extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    const { classes,
      name,
      tasks,
      handleModalOpen,
      handleBucketChange
    } = this.props
    return (
      <>
        <Grid item md={3} sm={6} xs={12}>
          <Card className={classes.root}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={name}
            />
            <CardContent>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  {tasks && tasks.map((task, index) => (
                    <Task name={task.name}
                      bucketName={name} isCompleted={task.isCompleted} handleBucketChange={handleBucketChange} key={index}
                    />
                  ))}
                </FormGroup>
              </FormControl>

            </CardContent>
            <CardActions disableSpacing>
              <TasksButton
                type="button"
                variant="contained"
                color="primary"
                className="submit"
                btnName="Edit Bucket"
                onClick={() => handleModalOpen(name, 'editBucket')}
              />
              <TasksButton
                type="button"
                variant="contained"
                color="primary"
                className="submit"
                btnName="Add Task"
                onClick={() => handleModalOpen(name, 'addTask')}
              />
            </CardActions>
          </Card>
        </Grid>
      </>
    )
  }
}

export default withStyles(styles)(Bucket)
