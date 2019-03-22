import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minHeight: '400px',
  },
  map: {
    color: 'red',
    padding: theme.spacing.unit * 2,
  },
})

class MapCard extends Component {
  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('maptest'), {
      center: {lat: 51.044308, lng: -114.0652801},
      zoom: 8,
    })
  }

  render(props) {
    const {classes} = this.props

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            Google Maps test...
          </Typography>
          <Typography component="p">blahh</Typography>
          <div
            id="maptest"
            style={{
              color: 'red',
              width: '300px',
              height: '300px',
              border: '2px dotted green',
            }}>
            I can haz map?
          </div>
        </Paper>
      </div>
    )
  }
}

MapCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MapCard)
