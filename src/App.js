import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import { 
    Grid,
    Typography,
    Card,
    Button
} from '@material-ui/core'
// import './App.css'
import MediaCard from './MediaCard'
import MapCard from './MapCard'

// grab place data from JSON source - will receive
// an array of Objects
import placeData from './dummy.json'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     height: 140,
    //     width: 100,
    // },
    // control: {
    //     padding: theme.spacing.unit * 2,
    // },
})


class App extends Component {
    
    
    clickHandler = (event) => {
        console.log('inside clickHandler')
        console.log(`event.target: ${event.target}`)
        console.log(`event.currentTarget: ${event.currentTarget}`)

    }


    render() {
        const { classes } = this.props

        let placeCards = []
        placeData.forEach(place => {
            placeCards.push(
                <Grid item key={place.id}>
                    <MediaCard 
                        name={place.name}
                        image={place.img[0]}
                        info={place.description}
                        lat={place.lat}
                        long={place.long}
                        clickHandler={this.clickHandler}
                    />
                </Grid>
                )
        })

        return (
            <React.Fragment>
                <CssBaseline />
                <Typography variant='h3' align='center' gutterBottom>
                    HUDDLE
                </Typography>
                <Grid container className={classes.root} justify="center" spacing={32}>
                {placeCards}
                <MapCard />
                </Grid>
            </React.Fragment >
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(App)

