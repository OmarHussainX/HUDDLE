import React, {Component} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

// this component is required to push everything down from the
// persistent nav bar

const styles = theme => ({
  spacer: {
    [theme.breakpoints.down('sm')]: {
      // MOBILE
      height: '48px',
    },
    [theme.breakpoints.up('md')]: {
      // TABLET
      height: '56px',
    },
    [theme.breakpoints.up('lg')]: {
      // DESKTOP
      height: '64px',
    },
  },
})

class VerticalSpace extends Component {
  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.spacer} />
      </React.Fragment>
    )
  }
}

VerticalSpace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VerticalSpace)
