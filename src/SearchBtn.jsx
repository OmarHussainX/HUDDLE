import React, {Component} from "react"
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: "40px",
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
            color="secondary"
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
