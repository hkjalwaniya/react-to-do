import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './styles'
import TasksButton from '../TasksButton';

class TaskModal extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    const {
      children,
      modalTitle,
      handleModalClose,
      handleActionSuccess
    } = this.props
    return (
      <>
        <Dialog open={true} onClose={handleModalClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <TasksButton
              type="button"
              variant="contained"
              color="primary"
              className="submit"
              btnName="Cancel"
              onClick={handleModalClose}
            />
            <TasksButton
              type="button"
              variant="contained"
              color="primary"
              className="submit"
              btnName="Done"
              onClick={() => handleActionSuccess()}
            />
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default withStyles(styles)(TaskModal)
