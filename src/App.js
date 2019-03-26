import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Grid} from '@material-ui/core'
import SpaceCard from './SpaceCard'
import SearchForm from './SearchForm'
import MainGallery from './MainGallery'

// import Typography from '@material-ui/core/Typography'

import Fab from '@material-ui/core/Fab'
import {Search} from '@material-ui/icons'

import Nav from './Nav'
import Login from './Login'
// import SearchForm from './SearchForm'
import Paper from '@material-ui/core/Paper'
import Image from './landing.jpg'
import Details from './Details'

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
    // NOTE: for some reason if both height & minHeight aren't set, it causes a
    // gap to appear all along the right!!
    height: '200px',
    minHeight: '200px',
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
    // -- thick cut text, with strong shadow
    // textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)'

    //-- close and heavy
    // textShadow: '0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)'

    //-- simple glow
    textShadow: '0px 0px 3px rgba(25,25,25,0.5)',

    // -- strong glow
    // textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff'
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
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
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
      filteredSpaces: spacesData,

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
    else if (
      targetID.includes('spacecrdindx') ||
      targetID.includes('spacebtnindx')
    ) {
      const arrayIndex = targetID.substring('spacecrdindx'.length) - 1
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

            {/*                         <Typography variant="h5" gutterBottom className={classes.textlogo}>
                            huddle
                        </Typography>
                        <div className={classes.container}>
                            <SearchForm />
                        </div>
 */}
            <br />
            <br />
            <br />
            <br />
            <MainGallery />
          </div>
        )}

        {this.state.view === 'details' && (
          <Grid container className={classes.spacesGrid} spacing={32}>
            <Details selectedSpace={this.state.selectedSpace} />
          </Grid>
          //   <DetailsOld
          //     selectedSpace={this.state.selectedSpace}
          //     clickHandler={this.clickHandler}
          //   />
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
