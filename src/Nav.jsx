import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'

const drawerWidth = 240
const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
})

class Nav extends Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}))
  }

  render() {
    const {classes, theme} = this.props
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Name', 'Capacity', 'Availability', 'Experience'].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ),
          )}
        </List>
        <Divider />
        <List>
          {['Test1', 'Test2', 'Test3'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              className={classes.menuButton}
              onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Button color="inherit" id="logo" onClick={this.props.onClick}>
                HUDDLE
              </Button>
            </Typography>

            <Button color="inherit" id="login-btn" onClick={this.props.onClick}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </React.Fragment>
    )
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Nav)
