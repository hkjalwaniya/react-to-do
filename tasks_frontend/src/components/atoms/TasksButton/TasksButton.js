import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class TasksButton extends Component {
  render() {
    const {
      type,
      fullWidth,
      variant,
      color,
      classes,
      btnName,
      disabled,
      onClick
    } = this.props
    return (
      <Button
        type={type}
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        className={classes.className}
        disabled={disabled}
        onClick={onClick}
      >
        {btnName}
      </Button>
    )
  }
}

TasksButton.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
}

export default withStyles(styles)(TasksButton)
