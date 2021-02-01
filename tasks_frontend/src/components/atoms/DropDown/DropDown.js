import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class DropDown extends Component {
  render() {
    const {
      handleSelection,
      classes,
      inputLabel,
      selectOptions,
      value,
      dropDownType,
      isRequired
    } = this.props
    return (
      <FormControl
        variant="outlined"
        className={classes.formControl}
        required={isRequired}
      >
        <InputLabel id={dropDownType}>{inputLabel}</InputLabel>
        <Select
          labelId={dropDownType}
          id={`select-${dropDownType}`}
          value={value || ''}
          onChange={(e) => handleSelection(e)}
          className={classes.selectEmpty}
          label={inputLabel}
        >
          {selectOptions &&
            selectOptions.map((option) => {
              return (
                <MenuItem key={`item-${option.id}`} value={option.value}>
                  {option.value}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    )
  }
}

export default withStyles(styles)(DropDown)
