import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  searchBtn: {
    fontSize: '30px',
    fontFamily: 'Pacifico',
    textTransform: 'lowercase',
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
    const {classes} = this.props

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Button
                color="inherit"
                id="logo"
                onClick={this.props.onClick}
                className={classes.searchBtn}
              >
                huddle
              </Button>
            </Typography>

            <Button color="inherit" id="login-btn" onClick={this.props.onClick}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Nav)
