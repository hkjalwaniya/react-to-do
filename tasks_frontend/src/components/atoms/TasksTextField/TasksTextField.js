import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class TasksTextField extends Component {
  render() {
    const {
      variant,
      margin,
      id,
      label,
      name,
      autoComplete,
      onChange,
      required,
      fullWidth,
      autoFocus
    } = this.props

    return (
      <TextField
        variant={variant}
        margin={margin}
        required={required}
        fullWidth={fullWidth}
        id={id}
        label={label}
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    )
  }
}

export default TasksTextField
