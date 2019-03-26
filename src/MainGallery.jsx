import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import {Grid} from '@material-ui/core'
import SpaceCard from './SpaceCard'
import spaces from './spaces.json'

const styles = theme => ({
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  spacesGrid: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    margin: 0,
  },
})

class MainGallery extends React.Component {
  render() {
    const {classes} = this.props

    let compArr = []
    spaces.forEach(item => {
      compArr.push(
        <Grow in={true} style={{transformOrigin: '0 0 0'}} {...{timeout: 1000}}>
          <Grid item key={item.id}>
            <SpaceCard
              id={item.id}
              name={item.name}
              image={item.img[0]}
              rate={item.rate}
              address={item.address}
              capacity={item.capacity}
              venue_type={item.venue_type}
              clickHandler={this.clickHandler}
            />
          </Grid>
        </Grow>,
      )
    })
    return (
      <>
        <div className={classes.container}>
          <Grid container className={classes.spacesGrid} spacing={32}>
            {compArr}
          </Grid>
        </div>
      </>
    )
  }
}

MainGallery.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainGallery)
