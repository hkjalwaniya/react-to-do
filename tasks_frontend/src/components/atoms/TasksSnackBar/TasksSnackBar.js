import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TasksSnackBar extends Component {
    render() {
        const {
            isOpen,
            handleSnackBarClose,
            severity,
            message
        } = this.props
        return (
            <Snackbar
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackBarClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }

}

export default TasksSnackBar
