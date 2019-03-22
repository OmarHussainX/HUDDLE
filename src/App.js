import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Grid} from '@material-ui/core'
import SpaceCard from './SpaceCard'
import Details from './Details'
import SearchBtn from './SearchBtn'
import Nav from './Nav'
import Login from './Login'
import SearchForm from './SearchForm'
import Paper from '@material-ui/core/Paper'
import Image from './landing.jpg'

// Import spaces data from JSON source - will receive an array of Objects
import spacesData from './spaces.json'

const styles = theme => ({
  // Top level container for the grid of spaces
  spacesGrid: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    margin: 0,
  },
  paperHeader: {
    background: `url(${Image}) center center`,
    backgroundSize: 'cover',
    padding: '50px',
    height: '50vh',
    minHeight: '520px',
  },
  container: {
    background: 'white',
    padding: '20px',
    paddingBottom: '30px',
    borderRadius: '5px',
    boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
    width: '20vw',
    minWidth: '200px',
    marginTop: '10vh',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

class App extends Component {
  constructor() {
    super()

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
    // console.log('inside clickHandler')
    // console.log(`event.target: ${event.target}`)
    // console.log(`event.currentTarget: ${event.currentTarget}`)
    console.log(`event.currentTarget.id: ${event.currentTarget.id}`)

    const targetID = event.currentTarget.id

    if (targetID === 'login-btn') {
      console.log('============> LOGIN BTN CLICKED')
      this.setState({view: 'login'})
    } else if (targetID === 'logo') {
      console.log('============> LOGO CLICKED')
      this.setState({
        view: 'home',
      })
    } 
    else if ( targetID.includes('spacecrdindx') || targetID.includes('spacebtnindx')) {
      const arrayIndex = targetID.substring('spacecrdindx'.length) - 1
      console.log(
        `============> space ${this.state.spaces[arrayIndex].name} CLICKED`,
      )
      this.setState({
        selectedSpace: arrayIndex,
        view: 'details',
      })
    }
  }

  render() {
    const {classes} = this.props

    let spaceCards = []
    spacesData.forEach(space => {
      spaceCards.push(
        <Grid item key={space.id}>
          <SpaceCard
            id={space.id}
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

        <Nav onClick={this.clickHandler} />

        {this.state.view === 'home' && (
          <div>
            <Paper className={classes.paperHeader}>
              <div className={classes.container}>
                <SearchForm />
              </div>
              <SearchBtn onClick={this.clickHandler} />
            </Paper>
            <br />
            <br />
            <br />
            <br />
            <Grid container className={classes.spacesGrid} spacing={32}>
              {spaceCards}
            </Grid>
          </div>
        )}

        {this.state.view === 'details' && (
          <Details
            selectedSpace={this.selectedSpace}
            clickHandler={this.clickHandler}
          />
        )}

        {this.state.view === 'login' && <Login />}
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
