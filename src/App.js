import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Grid} from '@material-ui/core'
// import './App.css'
import MediaCard from './MediaCard'
import MapCard from './MapCard'
import SearchBtn from './SearchBtn'
import Nav from './Nav'
import Menu from './Menu'

// Import spaces data from JSON source - will receive an array of Objects
import spacesData from './dummy.json'

const styles = theme => ({
    // Top level container for the grid of spaces
    spacesGrid: {
        flexGrow: 1,
        justifyContent: 'center',
    },
})


class App extends Component {
    constructor() {
        super();

        this.state = {
            // Master collection of ALL available spaces
            // (array of Objects - see JSON file for Object structure)
            spaces: spacesData,

            // Collection of spaces matching the user's search criteria
            // (array of Objects)
            filteredSpaces: [],

            // Reference to the space selected by the user for detailed view
            selectedSpace: null,

            // Indicates the current 'view' (overall state) of the app
            // Valid values are:
            //   'home'      - default (logo, search button, spaces)
            //   'search'    - search panel
            //   'filtered'  - filtered spaces (i.e. search results)
            //   'details'   - detail view for ONE space (selected by user)
            view: 'home',
        }
    }
 
    clickHandler = event => {
    console.log('inside clickHandler')
    // console.log(`event.target: ${event.target}`)
    // console.log(`event.currentTarget: ${event.currentTarget}`)
    }

  render() {
    const {classes} = this.props

    let spaceCards = []
    spacesData.forEach(space => {
      spaceCards.push(
        <Grid item key={space.id}>
          <MediaCard
            name={space.name}
            image={space.img[0]}
            info={space.description}
            lat={space.lat}
            long={space.long}
            clickHandler={this.clickHandler}
          />
        </Grid>,
      )
    })

    return (
      <React.Fragment>
        <CssBaseline />
        <Nav />
        <Menu />
        <SearchBtn onClick={this.clickHandler}/>

        {this.state.view === 'home' && (
            <Grid container className={classes.spacesGrid} spacing={32}>
                {spaceCards}
            </Grid>
        )}

        {this.state.view === 'details' && (
            <MapCard
                selectedSpace={this.selectedSpace}
                clickHandler={this.clickHandler}
            />
        )}

      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
