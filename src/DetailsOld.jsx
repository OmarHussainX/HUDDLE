import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minHeight: '400px',
  },
  media: {
    minHeight: 150,
    maxHeight: 150,
  },
  map: {
    color: 'red',
    padding: theme.spacing.unit * 2,
  },
})

class DetailsOld extends Component {
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
          <Typography variant="h2" component="h3">
            {this.props.selectedSpace.name}
          </Typography>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`/images/${this.props.selectedSpace.img[0]}`}
                title=""
              />

              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <div
            id="maptest"
            style={{
              color: 'red',
              width: '300px',
              height: '300px',
              border: '2px dotted green',
            }}
          />
        </Paper>
      </div>
    )
  }
}

DetailsOld.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DetailsOld)
