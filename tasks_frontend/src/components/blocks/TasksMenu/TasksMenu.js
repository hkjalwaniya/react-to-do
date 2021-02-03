import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class TasksMenu extends Component {
  render() {
    const {
      anchorEl,
      handleMenuClose,
      menuId,
      handleLogout,
      handleProfile,
      handleTasks
    } = this.props
    const isMenuOpen = Boolean(anchorEl)

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleTasks}>Tasks</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    )
  }
}

export default TasksMenu
