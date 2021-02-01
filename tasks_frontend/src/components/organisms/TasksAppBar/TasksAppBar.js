import React, { Component } from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'

import { userActions } from '../../../actions'
import styles from './styles'
import TasksMenu from '../../blocks/TasksMenu'
import TasksMobileMenu from '../../blocks/TasksMobileMenu'
import TasksSideBar from '../TasksSideBar'
import { history } from '../../../helpers'

class TasksAppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isSideBarOpen: false
    }
  }

  render() {
    const { classes, user } = this.props
    const { anchorEl, mobileMoreAnchorEl, isSideBarOpen } = this.state
    const menuId = 'primary-search-account-menu'
    const mobileMenuId = 'primary-search-account-menu-mobile'

    const setAnchorEl = (newAnchorEl) => {
      this.setState({ anchorEl: newAnchorEl })
    }
    const setMobileMoreAnchorEl = (newMobileMoreAnchorEl) => {
      this.setState({ mobileMoreAnchorEl: newMobileMoreAnchorEl })
    }

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
      setAnchorEl(null)
      handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleLogout = (e) => {
      e.preventDefault()
      const { dispatch } = this.props
      dispatch(userActions.logout(user.email))
      handleMenuClose()
    }

    const handleDrawerOpen = () => {
      this.setState({ isSideBarOpen: true })
    }

    const handleDrawerClose = () => {
      this.setState({ isSideBarOpen: false })
    }

    const handleProfile = () => {
      history.push('/profile')
      handleMenuClose()
    }
    const handleDashboard = () => {
      history.push('/dashboard')
      handleMenuClose()
    }
    return (
      <>
        <div className={classes.grow}>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: isSideBarOpen
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  isSideBarOpen && classes.hide
                )}
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Tasks
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <TasksMobileMenu
            mobileMenuId={mobileMenuId}
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            handleProfileMenuOpen={handleProfileMenuOpen}
            handleMobileMenuClose={handleMobileMenuClose}
          />
          <TasksMenu
            menuId={menuId}
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            handleLogout={handleLogout}
            handleProfile={handleProfile}
            handleDashboard={handleDashboard}
          />
          <TasksSideBar
            isSideBarOpen={isSideBarOpen}
            handleDrawerClose={handleDrawerClose}
            handleProfile={handleProfile}
            handleDashboard={handleDashboard}
          />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.user
  return {
    user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(TasksAppBar))
