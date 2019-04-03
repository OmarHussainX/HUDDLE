import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Grid} from '@material-ui/core'
import SearchForm from './SearchForm'
import Paper from '@material-ui/core/Paper'
import Image from './landing_office.png'
import {Redirect} from 'react-router'
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
    padding: '20px',
    // NOTE: for some reason if both height & minHeight aren't set, it causes a
    // gap to appear all along the right!!
    height: '250px',
    // minHeight: '300px',
    marginBottom: '20px',
    borderRadius: '0px',
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

      // Reference to the space selected by the user for detailed view
      selectedSpace: null,

      redirect: false,
    }
  }

  clickHandler = event => {
    const targetID = event.currentTarget.id

    // A space's card was clicked
    // - switch to details view for the space
    if (
      targetID.includes('spaceCrdIdx') ||
      targetID.includes('spacebtnindx')
    ) {
      const arrayIndex = targetID.substring('spaceCrdIdx'.length) - 1
      console.log(
        `============> '${this.state.spaces[arrayIndex].name}' CLICKED`,
      )
      this.setState({
        selectedSpace: this.state.spaces[arrayIndex],
        redirect: true,
      })
    }
  }

  render() {
    const {classes} = this.props
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/details',
            state: {selectedSpace: this.state.selectedSpace},
          }}
        />
      )
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paperHeader}>
          <Grid container className={classes.spacesGrid} spacing={32}>
            <SearchForm
              spaces={this.state.spaces}
              onClick={this.clickHandler}
            />
          </Grid>
        </Paper>
      </React.Fragment>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
