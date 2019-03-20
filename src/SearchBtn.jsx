import React, {Component} from "react"
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Grid, Typography, Card, Button} from '@material-ui/core'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class SearchBtn extends Component {
  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <div style={{textAlign: 'center'}}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.props.onClick}>
            Search
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

SearchBtn.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(SearchBtn)
