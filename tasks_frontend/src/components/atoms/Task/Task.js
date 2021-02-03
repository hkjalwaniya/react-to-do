import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import styles from './styles'

class Task extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    const { name, isCompleted, handleBucketChange, bucketName, classes } = this.props
    return (
      <>
        <FormControlLabel
          control={<Checkbox className={isCompleted ? classes.checkbox : ''} checked={isCompleted} onChange={() => handleBucketChange(bucketName, name)} name={name} />}
          label={name}
        />
      </>
    )
  }
}

export default withStyles(styles)(Task)
