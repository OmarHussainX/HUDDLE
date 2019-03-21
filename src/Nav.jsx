import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

class Nav extends Component {
  render() {
    const {classes} = this.props
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu">
            <MenuIcon />
          </IconButton>


          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Button color="inherit"
              name="logo"
              onClick={this.props.onClick}
            >
              HUDDLE
            </Button>
          </Typography>

          <Button color="inherit"
            name="login-btn"
            onClick={this.props.onClick}
          >
            Login
          </Button>

        </Toolbar>
      </AppBar>
    )
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Nav)
