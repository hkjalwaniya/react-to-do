import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import AccountCircle from '@material-ui/icons/AccountCircle'
import EventNoteIcon from '@material-ui/icons/EventNote'
import AssignmentIcon from '@material-ui/icons/Assignment'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import SchoolIcon from '@material-ui/icons/School'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import TasksLogo from '../../atoms/TasksLogo'

import styles from './styles'

export function SideBarContent({ handleProfile, handleDashboard }) {
  const sideBarTabs = [
    { name: 'Profile', icon: AccountCircle },
    { name: 'Upcoming Tests', icon: EventNoteIcon },
    { name: 'Tasks', icon: AssignmentIcon },
    { name: 'Subjects', icon: MenuBookIcon },
    { name: 'Syllabus', icon: SchoolIcon },
    { name: 'Motivation', icon: MyLocationIcon },
  ]
  const handleClick = (tabClicked) => {
    if (tabClicked === 'Profile') {
      handleProfile()
    } else {
      handleDashboard()
    }
  }

  return sideBarTabs.map((tab) => (
    <ListItem button key={tab.name} onClick={() => handleClick(tab.name)}>
      <ListItemIcon>
        <tab.icon color="primary" />
      </ListItemIcon>
      <ListItemText primary={tab.name} />
    </ListItem>
  ))
}

class TasksSideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      classes,
      handleDrawerClose,
      isSideBarOpen,
      handleProfile,
      handleDashboard
    } = this.props

    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isSideBarOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <TasksLogo />
            <Typography className={classes.title} variant="h6" noWrap>
              Tasks
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {isSideBarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <SideBarContent
              handleProfile={handleProfile}
              handleDashboard={handleDashboard}
            />
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <InboxIcon color="primary" />
                  ) : (
                    <MailIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.user
  return {
    user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(TasksSideBar))
