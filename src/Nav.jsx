import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

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
    fontFamily: 'Karla',
    textTransform: 'uppercase',
    textShadow: '0px 0px 4px rgba(25,25,25,0.8)',
  },
  logoTxt: {
    fontSize: '30px',
    fontFamily: 'Karla',
    textTransform: 'uppercase',
    textShadow: '0px 0px 4px rgba(25,25,25,0.8)',
    textDecoration: 'none',
    color: 'white',
  },
  navLink: {
    fontSize: '15px',
    fontFamily: 'Karla',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'white',
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
                <Link to="/" className={classes.logoTxt}>
                  huddle
                </Link>
            </Typography>

            <Link to="/login" className={classes.navLink}>
              login
            </Link>
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
