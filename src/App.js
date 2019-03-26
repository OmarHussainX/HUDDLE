import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Grid} from '@material-ui/core'
import SearchForm from './SearchForm'
import MainGallery from './MainGallery'
import Paper from '@material-ui/core/Paper'
import Image from './landing.jpg'
import Details from './Details'
import Fab from '@material-ui/core/Fab'
import {Search} from '@material-ui/icons'
import Nav from './Nav'
import Login from './Login'
// import SearchForm from './SearchForm'
// import Typography from '@material-ui/core/Typography'

// Import spaces data from JSON source - will receive an array of Objects
import space from './spaces.json'

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
    // NOTE: for some reason if both height & minHeight aren't set, it causes a
    // gap to appear all along the right!!
    height: '200px',
    minHeight: '200px',
    marginBottom: '70px',
  },
  container: {
    background: 'white',
    padding: '20px',
    paddingBottom: '30px',
    borderRadius: '5px',
    boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
    width: '25vw',
    minWidth: '300px',
    maxWidth: '250px',
    marginTop: '1vh',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textlogo: {
    fontFamily: 'Karla',
    fontSize: '3.5rem',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadow: '0px 0px 3px rgba(25,25,25,0.5)',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: '1100',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
})

class App extends Component {
  constructor() {
    super()

    this.state = {
      // Master collection of ALL available spaces
      // (array of Objects - see JSON file for Object structure)
      spaces: space,

      // Collection of spaces matching the user's search criteria
      // (array of Objects)
      filteredSpaces: space,

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
    const targetID = event.currentTarget.id

    // 'Search' FAB was clicked
    // - switch to search form/view...
    if (targetID === 'FABsearch') {
      console.log('============> Search FAB CLICKED')
      // this.setState({ view: 'login' })
    }

    // A space's card was clicked
    // - switch to details view for the space
    else if ( targetID.includes('spaceCrdIdx') || targetID.includes('spacebtnindx')) {
      console.log('clicked')
      const arrayIndex = targetID.substring('spaceCrdIdx'.length) - 1
      console.log(
        `============> '${this.state.spaces[arrayIndex].name}' CLICKED`,
      )
      this.setState({
        selectedSpace: this.state.spaces[arrayIndex],
        view: 'details',
      })
    }

    // 'Login' in the app header/top nav was clicked
    // - switch to login view
    else if (targetID === 'login-btn') {
      console.log('============> LOGIN CLICKED')
      this.setState({view: 'login'})
    }

    // 'Logo' in the app header/top nav was clicked
    // - switch to home/default view
    else if (targetID === 'logo') {
      console.log('============> LOGO CLICKED')
      this.setState({
        view: 'home',
      })
    }
  }

  render() {
    const {classes} = this.props


    return (
      <React.Fragment>
        <CssBaseline />
        <Nav onClick={this.clickHandler} />

        {this.state.view === 'home' && (
          <div>
            <Fab
              color="secondary"
              aria-label="Search"
              className={classes.fab}
              onClick={this.clickHandler}
              id="FABsearch">
              <Search>Search</Search>
            </Fab>
            <Paper className={classes.paperHeader} />
            <MainGallery onClick={this.clickHandler}/>
          </div>
        )}

        {this.state.view === 'details' && (
          <Grid container className={classes.spacesGrid} spacing={32}>
            <Details selectedSpace={this.state.selectedSpace} />
          </Grid>
        )}

        {this.state.view === 'search' && (
          <Grid container className={classes.spacesGrid} spacing={32}>
            <SearchForm filteredSpaces={this.state.filteredSpaces} />
          </Grid>
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
